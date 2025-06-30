import express from "express";
import { login, verifyToken } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", login);

adminRouter.post("/verify-token", verifyToken);

export default adminRouter;
