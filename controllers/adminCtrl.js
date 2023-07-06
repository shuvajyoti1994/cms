const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModel');

const getAllUsersController = async(req, res) => {
    try {
        const users = await userModel.find({});
        users.password = undefined;
        res.status(200).send({
            success: true,
            message: "Users Data List",
            data: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Fetching Users",
            error
        })
    }
}

const getAllDoctorsController = async() => {
    try {
        const doctors = await doctorModel.find({});
        res.status(200).send({
            success: true,
            message: "Doctors Data List",
            data: doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error While Fetching Doctors",
            error
        })
    }
}

module.exports = {getAllDoctorsController, getAllUsersController}