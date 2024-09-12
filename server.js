const express = require('express');
const routes = require('./routes'); // Import the routes folder
const mongooseConnection = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the routes for /api prefix
app.use('/api', routes);  // This prefixes all routes with '/api'

// Listen for the MongoDB connection to open
mongooseConnection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





