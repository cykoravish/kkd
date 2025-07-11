import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getAllUsers,
  login,
  verifyToken,
  getUsersByVerificationStatus,
  verifyAadharDocument,
  verifyPanDocument,
  verifyPassbookDocument,
  getKYCStats,
  getPendingKYCRequests,
  processKYCRequest,
} from "../controllers/adminController.js";
import { authenticateAdmin } from "../middlewares/adminAuthMiddleware.js";
import uploadCategory from "../middlewares/uploads/category.js";

const adminRouter = express.Router();

// Auth routes
adminRouter.post("/login", login);
adminRouter.post("/verify-token", verifyToken);

// Category routes
adminRouter.post(
  "/add-category",
  authenticateAdmin,
  uploadCategory.single("categoryImage"),
  addCategory
);
adminRouter.get("/categories", authenticateAdmin, getAllCategories);
adminRouter.delete("/delete-category/:id", authenticateAdmin, deleteCategory);

// User management routes
adminRouter.get("/all-users", authenticateAdmin, getAllUsers);
adminRouter.get(
  "/users-by-status",
  authenticateAdmin,
  getUsersByVerificationStatus
);


// 🚀 NEW: KYC Management Routes
adminRouter.get("/kyc-requests", authenticateAdmin, getPendingKYCRequests)
adminRouter.put("/kyc-process/:userId", authenticateAdmin, processKYCRequest)
adminRouter.get("/kyc-stats", authenticateAdmin, getKYCStats)




// 🚀 NEW: Document verification routes
adminRouter.put("/verify-pan/:userId", authenticateAdmin, verifyPanDocument);
adminRouter.put(
  "/verify-aadhar/:userId",
  authenticateAdmin,
  verifyAadharDocument
);
adminRouter.put(
  "/verify-passbook/:userId",
  authenticateAdmin,
  verifyPassbookDocument
);

export default adminRouter;
