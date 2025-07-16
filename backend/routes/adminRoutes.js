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
  getTransactionHistory,
  getDashboardStats,
  checkProductId
} from "../controllers/adminController.js";
import { authenticateAdmin } from "../middlewares/adminAuthMiddleware.js";
import uploadCategory from "../middlewares/uploads/category.js";
import {
  addPromotion,
  getAllPromotions,
  deletePromotion,
} from "../controllers/promotionController.js";
import uploadPromotion from "../middlewares/uploads/promotion.js";
import {
  addProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  testQRScan
} from "../controllers/productController.js"
import uploadProduct from "../middlewares/uploads/product.js";

const adminRouter = express.Router();

// Auth routes
adminRouter.post("/login", login);
adminRouter.post("/verify-token", verifyToken);

// Product ID Check Route
adminRouter.post("/check-product-id", authenticateAdmin, checkProductId)

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
adminRouter.get("/kyc-requests", authenticateAdmin, getPendingKYCRequests);
adminRouter.put("/kyc-process/:userId", authenticateAdmin, processKYCRequest);
adminRouter.get("/kyc-stats", authenticateAdmin, getKYCStats);

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

// Promotion management routes
adminRouter.post("/add-promotion", authenticateAdmin, uploadPromotion.single("promotionImage"), addPromotion)
adminRouter.get("/promotions", authenticateAdmin, getAllPromotions)
adminRouter.delete("/delete-promotion/:id", authenticateAdmin, deletePromotion)

// Product Management Routes
adminRouter.post("/add-product", authenticateAdmin, uploadProduct.single("productImage"), addProduct)
adminRouter.get("/products", authenticateAdmin, getAllProducts)
adminRouter.put("/update-product/:id", authenticateAdmin, uploadProduct.single("productImage"), updateProduct)
adminRouter.delete("/delete-product/:id", authenticateAdmin, deleteProduct)
adminRouter.patch("/toggle-product-status/:id", authenticateAdmin, toggleProductStatus)

//fetching stats
adminRouter.get("/transaction-history", authenticateAdmin, getTransactionHistory)
adminRouter.get("/dashboard-stats", authenticateAdmin, getDashboardStats)

// 🚀 NEW: QR Testing Route for Admin
adminRouter.post("/test-qr-scan", authenticateAdmin, testQRScan)


export default adminRouter;
