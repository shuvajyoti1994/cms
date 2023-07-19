const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModel')

const getDoctorInfoController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: "Doctor Info Getting Successfully",
            data: doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Doctor Info Details"
        })
    }
}

const updateProfileController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body);
        res.status(201).send({
            success: true,
            message: "Doctor Profile Updated Successfully",
            data: doctor
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Dortor info Updete",
            error
        })
    }
};

const getDoctorByIdController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({_id: req.body.doctorId});
        res.status(200).send({
            success: true,
            message:"Fetch Doctor Info",
            data:doctor
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Single Doctor",
            error
        })
    }
};

// doctor appointment
const doctorAppointmentController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        const appointments = await appointmentModel.find({doctorId: doctor._id});
        res.status(200).send({
            success: true,
            message: "Doctor appointments fetch successfully",
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in doctor appointment",
            error
        })
    }
};

// change appointment status
const updateStatusController = async(req, res) => {
    try {
        const {appointmentsId, status} = req.body;
        const appointments = await appointmentModel.findByIdAndUpdate(appointmentsId,{status});
        const user = await userModel.findOne({_id:appointments.userId});
        const notification = await user.notification;
        notification.push({
            type: "status-updated",
            message: `Your appointment has been ${status}`,
            onClickPath: '/doctor-appointments'
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Appointment status updated',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in update status",
            error
        })
    }
}

module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentController, updateStatusController}