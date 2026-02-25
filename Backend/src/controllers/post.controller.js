const postmodel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const{toFile} = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");
const userModel = require("../models/user.model");



const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
}) 

async function createPostController(req,res){
    

    
    
    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer), req.file.originalname),
        fileName : "Test",
        folder:"instagram-clone-posts"
    })

    const post = await postmodel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        userId:req.user.id
    })
    
    res.status(201).json({
        message:"Post created successfully",
        post
    })

}

async function getPostController(req,res){
   

    const userId = req.user.id  

    const posts = await postmodel.find({
        userId
    })
    
    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}


async function getPostDetailsController(req,res){
   

    const userId = req.user.id
    const postId = req.params.postid
    
    const post = await postmodel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    const isValidUser = post.userId.toString() === userId

    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden access"
        })
    }

    return res.status(200).json({
        message:"Post details fetched successfully",
        post
    })
}

async function likePostController(req,res){

    const username = req.user.username
    const postId = req.params.postId  
    const post = await postmodel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    
    const like = await likeModel.create({
        post:postId,
        user:username
    })

    res.status(200).json({
        message:"Post liked successfully",
        like
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}