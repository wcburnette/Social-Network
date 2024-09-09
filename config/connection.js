const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost/social-network-api', {});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to social-network-api database');
});

mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected due to application termination');
    process.exit(0);
  });
});

module.exports = mongoose;


