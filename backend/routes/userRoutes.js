import express from "express";
import {
  getUser,
  userLogin,
  userSignup,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/userAuthMiddleware.js";
import { getAllCategories } from "../controllers/adminController.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/get-user", authenticateToken, getUser);
userRouter.get("/get-categories", authenticateToken, getAllCategories);

export default userRouter;
