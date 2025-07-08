import express from "express";
import {
  addCategory,
  getAllCategories,
  login,
  verifyToken,
} from "../controllers/adminController.js";
import upload from "../middlewares/uploads/category.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);

adminRouter.post("/verify-token", verifyToken);

adminRouter.post("/add-category", upload.single("categoryImage"), addCategory);

adminRouter.get("/categories", getAllCategories);

export default adminRouter;
