const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Name is require']
    },
    email:{
        type: String,
        require: [true, 'Email is require']
    },
    password:{
        type: String,
        require: [true, 'Password is require']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    notification:{
        type: Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;