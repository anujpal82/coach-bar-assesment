const express = require("express");
const {
  authenticateToken,
  isAdmin,
} = require("../middlewares/auth.middleware");
const { updateUser, lookupAllUsers } = require("../controllers/user.controller");
// const { createProduct } = require("../controllers/product.controller");

const userRouter = express.Router();

userRouter.put("/update-user", authenticateToken,updateUser);
userRouter.get("/user-lookup", authenticateToken,isAdmin,lookupAllUsers);

module.exports = userRouter;
