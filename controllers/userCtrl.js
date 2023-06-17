const userModel= require('../models/userModel');
const bcrypt = require('bcryptjs');

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
const loginController = () => {}

module.exports = {loginController, registerController}