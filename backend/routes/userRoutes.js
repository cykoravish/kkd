import express from "express";
import {
  getUser,
  updateProfile,
  userLogin,
  userSignup,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/userAuthMiddleware.js";
import { getAllCategories } from "../controllers/adminController.js";
import uploadProfile from "../middlewares/uploads/profile.js";

const userRouter = express.Router();

// Authentication routes
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

// Protected routes
userRouter.get("/get-user", authenticateToken, getUser);
userRouter.get("/get-categories", authenticateToken, getAllCategories);

// 🚀 FIXED: Update profile route with optional image upload
userRouter.put(
  "/update-profile",
  authenticateToken,
  uploadProfile.single("profilePick"),
  updateProfile
);

// 🚀 for future implementation: Separate password update route for security
// userRouter.put("/update-password", authenticateToken, updatePassword);

export default userRouter;
