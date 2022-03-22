const router = require("express").Router();
const userController = require('../controllers/user');

router.use('/user', userController);

module.exports = router;