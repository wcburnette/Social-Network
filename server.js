const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;

// Import MongoDB connection
require('./config/connection');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/thoughts', require('./routes/api/thoughts'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


