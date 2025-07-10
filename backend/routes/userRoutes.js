import express from "express";
import {
  getUser,
  updateProfile,
  userLogin,
  userSignup,
  updatePassword,
  uploadPanPhoto,
  uploadAadharPhoto,
  uploadPassbookPhoto,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/userAuthMiddleware.js";
import { getAllCategories } from "../controllers/adminController.js";
import uploadProfile from "../middlewares/uploads/profile.js";
import { uploadPan, uploadAadhar, uploadPassbook } from "../middlewares/uploads/documents.js";

const userRouter = express.Router();

// Authentication routes
userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);

// Protected routes
userRouter.get("/get-user", authenticateToken, getUser);
userRouter.get("/get-categories", authenticateToken, getAllCategories);

// Profile update routes
userRouter.put("/update-profile", authenticateToken, uploadProfile.single("profilePick"), updateProfile);
userRouter.put("/update-password", authenticateToken, updatePassword)

// Document upload routes
userRouter.post("/upload-pan", authenticateToken, uploadPan.single("panPhoto"), uploadPanPhoto)
userRouter.post("/upload-aadhar", authenticateToken, uploadAadhar.single("aadharPhoto"), uploadAadharPhoto)
userRouter.post("/upload-passbook", authenticateToken, uploadPassbook.single("passbookPhoto"), uploadPassbookPhoto)

export default userRouter;
