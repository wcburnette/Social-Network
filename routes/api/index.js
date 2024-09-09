const router = require('express').Router();
const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');

// Use API routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
