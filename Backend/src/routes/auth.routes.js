const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

authRouter.post("/register", authController.registerController); //register route

authRouter.post("/login", authController.loginController);

/*
@route GET /api/auth/get-me
@desc get user details
@access private
*/
authRouter.get("/get-me", identifyUser,authController.getMeController);

module.exports = authRouter;
