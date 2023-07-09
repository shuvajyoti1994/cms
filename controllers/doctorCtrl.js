const doctorModel = require('../models/doctorModel')

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
}

module.exports = {getDoctorInfoController, updateProfileController}