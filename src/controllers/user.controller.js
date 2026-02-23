const followermodel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message:"you cannot follow yourself"
        })
    }

    const isAlreadyFollowing = await followermodel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })


    const isFolloweeExists = await userModel.findOne({
        username:followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            message:"User with this username does not exist"
        })
    }

    if(isAlreadyFollowing){
        return res.status(400).json({
            message:"you are already following this user",
            follow:isAlreadyFollowing
        })
    }

    const followRecord = await followermodel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(200).json({
        message:"you are now following " + followeeUsername,
        follow:followRecord
    })
}


async function unfollowUserController(req,res){

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followermodel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })

    if(!isUserFollowing){
        return res.status(400).json({
            message:"you are not following this user"
        })
    }   

    await followermodel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:"you have unfollowed " + followeeUsername
    })
}


module.exports = {
    followUserController,  
    unfollowUserController
}