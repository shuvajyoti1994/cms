const express = require('express');
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController } = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const route = express.Router();

// route
// LOGIN ||POST
route.post('/login', loginController);
// REGISTER ||POST
route.post('/register', registerController);

// AUTH ||POST
route.post('/getUserData', authMiddleware, authController);

// APPLY DOCTOR ||POST
route.post('/apply-doctor', authMiddleware, applyDoctorController);

// NOTIFICATION ||POST
route.post('/get-all-notification', authMiddleware, getAllNotificationController);

module.exports = route;