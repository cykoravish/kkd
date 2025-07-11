import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getAllUsers,
  login,
  verifyToken,
} from "../controllers/adminController.js";
import uploadCategory from "../middlewares/uploads/category.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);

adminRouter.post("/verify-token", verifyToken);

adminRouter.post("/add-category", uploadCategory.single("categoryImage"), addCategory);

adminRouter.get("/categories", getAllCategories);

adminRouter.delete("/delete-category/:id", deleteCategory);

adminRouter.get("/all-users", getAllUsers);

export default adminRouter;
