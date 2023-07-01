const userModel= require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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

module.exports = {loginController, registerController, authController}