const mongoose = require('mongoose');
require('dotenv').config();

// eslint-disable-next-line no-undef
const MONGO_URI = process.env.MONGO_URI;

const connectToDB = async() => {
    try {
      mongoose.connect(process.env.MONGO_URL);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { connectToDB };