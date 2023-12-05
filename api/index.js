const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URL);
jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.get('/test', (req, res) => {
  res.json('test ok')
});

async function getUserDataFromRequest(req) {
  return new mongoose.Promise((resolve, reject) => {
      const token = req.cookies?.token;
      if (token) {
          jwt.verify(token, jwtSecret, {}, (err, userData) => {
              if (err) throw err;
              resolve(userData);
          })
      } else {
          reject('no token')
      }
  })
}

app.get('/profile', (req, res) => {
  const token = req.cookies?.token;
  if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
          if (err) throw err;
          res.json(userData);      
      })
  } else {
      res.status(401).json('no token')
  }
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
      const passOk = bcrypt.compareSync(password, foundUser.password);
      if (passOk) {
          jwt.sign({ userId: foundUser._id, username }, jwtSecret, {}, (err, token) => {
              res.cookie('token', token, { sameSite: 'none', secure: true }).json({
                  id: foundUser._id,
              });
          });
      }
  }
});

app.post('/logout',(req, res) => {  
  res.cookie('token', '', {sameSite:'none', secure:true}).json('ok');
})


app.post('/register', async (req, res) => {
  const { username, email, password} = req.body;
  console.log(bcryptSalt);
  try {
      //const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
      const createdUser = await User.create({
          username: username,
          email: email,
          password: password
      });
      console.log('aaaaa')
      jwt.sign({ userId: createdUser._id, username }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token, { sameSite: 'none', secure: true }).status(201).json({
              id: createdUser._id,
          });
      });
  } catch (err) {
      if (err) throw err;
      res.status(500).json('error')
  }
});

const server = app.listen(4040);