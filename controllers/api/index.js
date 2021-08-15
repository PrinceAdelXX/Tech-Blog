const router = require('express').Router();


// ------------------- importing model routes -------------------//
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');


// ------------------- instructing middle ware to use them -------------------//
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);


module.exports = router;