const postmodel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const{toFile} = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");



const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
}) 

async function createPostController(req,res){
    console.log(req.body, req.file) ;


    const token =  req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided,Unauthorized access"
        })
    }

    let decoded= null ;

         try{
             decoded = jwt.verify(token, process.env.JWT_SECRET)
         }catch(err){
            return res.status(401).json({
                message:"Invalid token,Unauthorized access"
            })
         }


    console.log(decoded) ;
    
    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer), req.file.originalname),
        fileName : "Test",
        folder:"instagram-clone-posts"
    })

    const post = await postmodel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        userId:decoded.id
    })
    
    res.status(201).json({
        message:"Post created successfully",
        post
    })

}

async function getPostController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

     let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    const userId = decoded.id

    const posts = await postmodel.find({
        userId
    })
    
    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}


async function getPostDetailsController(req,res){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized access"
        })
    }

    const userId = decoded.id
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

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}