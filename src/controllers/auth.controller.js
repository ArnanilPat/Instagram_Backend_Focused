const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");



async function registerController(req,res){
    const {username,email,password,bio,profileImage} = req.body;


    const isUserAlreadyExists = await userModel.findOne({$or:[{email},{username}]})

    if(isUserAlreadyExists){
        return res.status(400)
        .json({
            message:"User with this email or username already exists" +(isUserAlreadyExists.email === email ? "email already exist":"username already exist")
        })
    }

    const hash= await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered successfully",
        user:{  
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}

async function loginController(req,res){      //login route
    const {username,email,password} = req.body;

    const user = await userModel.findOne({$or:[{email:email},{username:username}]})

    if(!user){  
        return res.status(400).json({
            message:"User not found with this email or username"
        })
    }

    
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in successfully",
        user:{  
            email:user.email,   
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
}


module.exports = {
    registerController,
    loginController
}