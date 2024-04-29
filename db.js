const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB Server');
});

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

db.on('disconnected', () => {
    console.log('MongoDB Disconnected');
});

module.exports = db;

