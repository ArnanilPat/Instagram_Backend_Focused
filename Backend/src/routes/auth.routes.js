

const express = require('express');
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");



authRouter.post("/register",authController.registerController)     //register route

authRouter.post("/login",authController.loginController)


module.exports = authRouter;