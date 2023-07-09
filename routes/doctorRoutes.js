const express = require('express');
const { getDoctorInfoController, updateProfileController } = require('../controllers/doctorCtrl');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')

// DOCTOR INFO || POST 
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController)

// UPDATE PROFILE || POST
router.post('/updateProfile', authMiddleware, updateProfileController)

module.exports = router;