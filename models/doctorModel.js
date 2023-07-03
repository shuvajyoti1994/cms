const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String,
        require: [true, 'first name is required']
    },
    lastName: {
        type: String,
        require: [true, 'last name is required']
    },
    phone: {
        type: String,
        require: [true, 'phone no is required']
    },
    email: {
        type: String,
        require: [true, 'email is required']
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        require: [true, 'address is required']
    },
    specialization:{
        type: String,
        require: [true, 'specialization is required']
    },
    experience: {
        type: String,
        require: [true, 'experience is required']
    },
    fees: {
        type: Number,
        require: [true, 'fees is required']
    },
    status:{
        type: String,
        default:'pending'
    },
    timing: {
        type: Object,
        require: [true, 'work timing is required']
    }
},
{timestamps: true});

const doctorModel = mongoose.model('doctor', doctorSchema)
module.exports = doctorModel;