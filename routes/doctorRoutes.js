const express = require('express');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentController, updateStatusController } = require('../controllers/doctorCtrl');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

// DOCTOR INFO || POST 
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

// UPDATE PROFILE || POST
router.post('/updateProfile', authMiddleware, updateProfileController)

// GET DOCTOR BY ID || POST
router.post('/getDoctorById', authMiddleware, getDoctorByIdController)

// GET APPOINTMENT || GET
router.get('/doctor-appointments', authMiddleware, doctorAppointmentController)

// CHANGE APPOINTMENT STATUS
router.post('/update-appointment-status', authMiddleware, updateStatusController)

module.exports = router;