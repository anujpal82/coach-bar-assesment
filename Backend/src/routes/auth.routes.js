const express = require("express");
const { signUp, signIn } = require("../controllers/auth.controller");
const { authenticateToken, isAdmin } = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/sign-up",authenticateToken,isAdmin, signUp);
authRouter.post("/sign-in", signIn);
module.exports = authRouter;
