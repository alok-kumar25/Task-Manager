const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;
mongoose.connect(url).then(() => {
        console.log('Successfully connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas:', err.message);
    });

module.exports = mongoose;