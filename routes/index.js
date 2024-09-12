const express = require('express');
const router = express.Router();
const userRoutes = require('./api/users');
const thoughtRoutes = require('./api/thoughts');

// Map routes for users and thoughts
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;




