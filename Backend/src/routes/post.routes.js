const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload =  multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")
  

// @route POST/api/posts
// @desc create a post with given caption and image. also check if the user is authenticated or not
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)


// @route GET/api/posts
// @desc get all posts of the authenticated user
postRouter.get("/",identifyUser,postController.getPostController)

/*
*GET/api/posts/details/:postid
rerurn details of a post with given postid.also check if the post belongs to the user or not
*/
postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsController)


// @route  POST/api/posts/like/:postid
// @desc like a post with given postid. also check if the user is authenticated or not
postRouter.post("/like/:postId",identifyUser,postController.likePostController)





module.exports = postRouter;