const User = require('../config/user');
const jwt = require('jsonwebtoken');

const signup = async (req , res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }
        const user = new User({name, email, password});
        await user.save();
        return res.status(201).json({message : "User created successfully"});
    }catch(err){
        return res.status(500).json({message : "internal server error"});
    }
};

const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        stringPassword = String(password);
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message : "User does not exist"});
        }
        const isPasswordCorrect = await user.comparePassword(stringPassword);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({email : user.email, _id : user._id}, process.env.JWT_SECRET, {expiresIn : "5h"});
        const userName = user.name;
        return res.status(200).json({ message: 'Login successful!', token, userName});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { signup, login };