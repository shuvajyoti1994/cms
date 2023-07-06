const express = require('express');
const { getAllUsersController, getAllDoctorsController } = require('../controllers/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// GET USERS || GET
router.get('/getAllUsers', authMiddleware, getAllUsersController)

// GET DOCTORS || GET
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

module.exports = router;