const { Router } = require("express");
const {
  createUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/user.controllers.js");
const { verifyToken } = require("../middleware/extractToken.js");

const userRouter = Router();

userRouter.get("/api/users", verifyToken, getAllUsers);
userRouter.get("/api/user/:id", verifyToken, getUser);
userRouter.patch("/api/user/:id", verifyToken, updateUser);
userRouter.post("/api/auth/create", createUser);
userRouter.post("/api/auth/login", loginUser);

module.exports = userRouter;
