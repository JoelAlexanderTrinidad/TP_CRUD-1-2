const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const userValidator = require('../validations/usersValidation');

router.get('/register', usersController.register)
router.post('/register', userValidator,usersController.registerProcess)

module.exports = router;