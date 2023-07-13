const express = require('express');
const { loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController } = require('../controllers/userCtrl');
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

// DELETE-NOTIFICATION ||POST
route.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);


// GET ALL DOCTOR || GET
route.get('/getAllDoctors', authMiddleware, getAllDoctorsController);

// BOOK APPOINTMENT || POST
route.post('/book-appointment', authMiddleware, bookAppointmentController)

module.exports = route;