const userModel= require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const moment = require('moment')

const registerController = async(req, res) => {
    try {
        const existUser = await userModel.findOne({email: req.body.email})
        if(existUser){
            return res.status(200).send({message:'User Already Exist', success: false})
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        req.body.password = hashPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).send({message:'Register successfully', success: true})
    } catch (error) {
        console.log(error);
        res.status(500).send({success: false, message: `Register Controller ${error.message}`})
    }
}

// Login callback
const loginController = async(req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            return res.status(200).send({message:'User not found', success: false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) {
            return res.status(200).send({message: 'Invalid Email or Password', success: false})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(200).send({message: 'Login Success', success: true, token})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:`Error in Login CTRL ${error.message}`})
    }
}

const authController = async(req, res) =>{
    try {
        const user = await userModel.findById({_id: req.body.userId})
        if(!user) {
            return res.status(200).send({message: 'user not found', success: false})
        } else {
            res.status(200).send({
                data:user,
                success:true
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Auth Error', success: false, error})
    }
}

const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({...req.body, status:'pending'})
        await newDoctor.save();
        const adminUser = await userModel.findOne({isAdmin: true});
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor account`,
            data:{
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " "+ newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, {notification});
        res.status(201).send({
            success: true,
            message: "Doctor Account Applied SUccessfully",
          });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error While Appling for Doctor'
        })
    }
}

//Notification ctrl
const getAllNotificationController = async(req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId});
        const seenNotification = user.seennotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updateUser = await user.save();
        res.status(200).send({
            data: updateUser,
            message: "All notification marked as read",
            success: true
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error in notification", success: false, error})
    }
}

//delete notification
const deleteAllNotificationController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
      user.notification = [];
      user.seennotification = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "Notifications Deleted successfully",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "unable to delete all notifications",
        error,
      });
    }
  };

//   Get All Doctors
  const getAllDoctorsController = async(req, res) => {
    try {
        const doctors = await doctorModel.find({status: 'approved'});
        res.status(200).send({
            success: true,
            message:"All doctors fetching successfully",
            data: doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while fetching doctors",
            error
        })
    }
  };

//   book appointment controller
const bookAppointmentController = async(req, res) => {
    try {
        req.body.date = moment(req.body.date,'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time,'HH:mm').toISOString();
        req.body.status = 'pending'
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({_id: req.body.doctorInfo.userId});
        user.notification.push({
            type:'New-appointment-request',
            message:`A new appointment request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        });
        await user.save()
        res.status(200).send({
            success: true,
            message:"Appointment book successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Book an Appointment",
            error
        })
    }
};

// 
const BookingAvailabilityController = async(req, res) => {
    try {
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time:{
                $gte: fromTime, $lte: toTime
            }
        });
        if(appointments.length > 0) {
            return res.status(200).send({
                message: "Appointments not Availibale at this time",
                success: true
            })
        } else {
            return res.status(200).send({
                success: true,
                message: "Appointments slot are avilibale"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Booking",
            error
        })
    }
};

// Appointment list get
const userAppointmentController = async(req, res) => {
    try {
        const appointments = await appointmentModel.find({userId: req.body.userId});
        res.status(200).send({
            success: true,
            message: " User Appointments Fetch Successfully",
            data: appointments
        })
    } catch (error) {
       console.log(error);
       res.status(500).send({
        success: false,
        message: "Error in User Appointments",
        error
       })
    }
}

module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctorsController,
    bookAppointmentController,
    BookingAvailabilityController,
    userAppointmentController
};