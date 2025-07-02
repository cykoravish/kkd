import express from "express";
import {
  getUserProfile,
  userLogin,
  userSignup,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/userAuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/profile", authenticateToken, getUserProfile);

export default userRouter;
