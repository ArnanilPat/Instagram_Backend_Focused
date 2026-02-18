const mongoose = require("mongoose");   

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Username is required"],
        unique: [true,"Username must be unique"]    
    },
    email: {
        type: String,
        required: [true,"Email is required"],
        unique: [true,"Email must be unique"]
    },
    password: { 
        type: String,
        required: [true,"Password is required"]
    },  
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/arnanil/default-image.jpg?updatedAt=1771339500940"
    }

})


const userModel = mongoose.model("Users",userSchema);

module.exports = userModel;