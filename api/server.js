





//import dependencies
const express = require('express');
const cors = require('cors');

//import utils
const { connectToDB } = require('./utils/db');
require('dotenv').config();

// eslint-disable-next-line no-undef
const { PORT } = process.env;
const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//import routes
const userRoutes = require('./routes/user');

//use routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to WAAH APP!');
    console.log(req.body);
});

app.get('/test', (req, res) => {
    res.json('test ok')
  });
const gpsd = require('node-gpsd');

const request = require('request');

const apiKey = 'a21fc69758284e04b21046adc57d1654'; // Replace with your actual API key

// Route to get the current location
app.get('/location', (req, res) => {
  // Get the IP address of the user making the request
  const ipAddress = req.ip;

  // Make a request to the IP geolocation service
  const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`;
  request(apiUrl, (error, response, body) => {
    if (error || response.statusCode !== 200) {
        // Handle error
        console.error('Error retrieving location:', error || body);
        res.status(500).json({ error: 'Failed to retrieve location' });
        return;
      }

    // Parse the response body
    const locationData = JSON.parse(body);

    // Extract latitude and longitude from the location data
    const { latitude, longitude } = locationData;

    // Respond with the location data
    res.json({ latitude, longitude });
  });
});

app.listen(PORT, async() => {
    await connectToDB(); 
    console.log(`listening at http://localhost:4040`);
});