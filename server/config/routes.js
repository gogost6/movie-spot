const router = require("express").Router();
const userController = require('../controllers/user');
const moviesController = require('../controllers/movies');

router.use('/user', userController);
router.use('/movies', moviesController);

module.exports = router;