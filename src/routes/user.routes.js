const express = require("express");
const userController = require("../controllers/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter = express.Router();

// @route POST/api/users/follow/:userid
// @desc follow a user with given userid
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

// @route POST/api/users/unfollow/:userid
// @desc unfollow a user with given userid
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)




module.exports = userRouter;