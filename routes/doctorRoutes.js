const express = require('express');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController } = require('../controllers/doctorCtrl');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

// DOCTOR INFO || POST 
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

// UPDATE PROFILE || POST
router.post('/updateProfile', authMiddleware, updateProfileController)

// GET DOCTOR BY ID || POST
router.post('/getDoctorById', authMiddleware, getDoctorByIdController)

module.exports = router;