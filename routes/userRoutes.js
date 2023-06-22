const express = require('express');
const { loginController, registerController, authController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const route = express.Router();

// route
// LOGIN ||POST
route.post('/login', loginController);
// REGISTER ||POST
route.post('/register', registerController);

// AUTH ||POST
route.post('/getUserData', authMiddleware, authController)


module.exports = route;