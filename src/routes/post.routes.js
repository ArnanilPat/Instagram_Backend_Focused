const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload =  multer({storage:multer.memoryStorage()})

  


postRouter.post("/",upload.single("image"),postController.createPostController)

postRouter.get("/",postController.getPostController)

/*
*GET/api/posts/details/:postid
rerurn details of a post with given postid.also check if the post belongs to the user or not
*/

postRouter.get("/details/:postId",postController.getPostDetailsController)

module.exports = postRouter;