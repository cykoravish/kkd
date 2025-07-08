import express from "express";
import {
  addCategory,
  deleteCategory,
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

adminRouter.delete("/delete-category/:id", deleteCategory);

export default adminRouter;
