const express = require('express');
const { loginController, registerController } = require('../controllers/userCtrl');
const route = express.Router();

// route
route.post('/login', loginController);
route.post('/register', registerController);

module.exports = route;