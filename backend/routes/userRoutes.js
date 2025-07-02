import express from "express";
import { userSignup } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);

export default userRouter;
