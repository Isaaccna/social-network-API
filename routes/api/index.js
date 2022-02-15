
   
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const { User, Thought } = require('../../models');

// add prefixes of /user and /thought
router.use('/users', userRoutes);
router.use('/friends', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/reactions', thoughtRoutes);

module.exports = router;