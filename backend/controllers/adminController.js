import jwt from "jsonwebtoken";
import Category from "../models/Category.js";
import cloudinary from "../helpers/cloudinary/cloudinary.js";
import User from "../models/User.js";

export const login = (req, res) => {
  const { emailOrPhone, password } = req.body;

  const isEmailOrPhoneValid =
    emailOrPhone === process.env.ADMIN_EMAIL ||
    emailOrPhone === process.env.ADMIN_PHONE;

  if (isEmailOrPhoneValid && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ user: emailOrPhone }, process.env.JWT_SECRET, {
      expiresIn: "16h",
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

export const verifyToken = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Category name and image are required",
      });
    }

    const imageUrl = req.file.path; // 👈 Cloudinary secure URL

    const newCategory = await Category.create({
      categoryName,
      categoryImage: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Add Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the category by ID
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Extract public ID from Cloudinary image URL
    const imageUrl = category.categoryImage;
    const segments = imageUrl.split("/");
    const publicIdWithExtension = segments[segments.length - 1];
    const publicId = `kkd/categories/${publicIdWithExtension.split(".")[0]}`;

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete category from database
    await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 🚀 NEW: Get All Users (Latest First)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -__v") // Exclude password and version key
      .sort({ createdAt: -1 }); // Latest first

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getPendingKYCRequests = async (req, res) => {
  try {
    const pendingUsers = await User.find({ kycStatus: "pending" }).select("-password -__v").sort({ kycRequestDate: -1 })

    res.status(200).json({
      success: true,
      message: "Pending KYC requests fetched successfully",
      data: pendingUsers,
    })
  } catch (error) {
    console.error("Get Pending KYC Requests Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

export const processKYCRequest = async (req, res) => {
  try {
    const { userId } = req.params
    const { action, rejectionReason } = req.body // action: 'approve' or 'reject'

    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be either 'approve' or 'reject'",
      })
    }

    if (action === "reject" && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required when rejecting KYC",
      })
    }

    const user = await User.findOne({ userId })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (user.kycStatus !== "pending") {
      return res.status(400).json({
        success: false,
        message: "KYC request is not in pending status",
      })
    }

    if (action === "approve") {
      user.kycStatus = "approved"
      user.kycApprovalDate = new Date()
      user.kycRejectionReason = ""

      // Approve all documents
      user.panVerificationStatus = "verified"
      user.aadharVerificationStatus = "verified"
      user.passbookVerificationStatus = "verified"

      // Clear rejection reasons
      user.panRejectionReason = ""
      user.aadharRejectionReason = ""
      user.passbookRejectionReason = ""
    } else {
      user.kycStatus = "rejected"
      user.kycRejectionReason = rejectionReason
      user.kycApprovalDate = null

      // Reset document statuses to incomplete
      user.panVerificationStatus = "incomplete"
      user.aadharVerificationStatus = "incomplete"
      user.passbookVerificationStatus = "incomplete"
      user.isProfileComplete = false
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: `KYC request ${action}d successfully`,
      data: {
        userId: user.userId,
        kycStatus: user.kycStatus,
        kycApprovalDate: user.kycApprovalDate,
        kycRejectionReason: user.kycRejectionReason,
      },
    })
  } catch (error) {
    console.error("Process KYC Request Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

export const getKYCStats = async (req, res) => {
  try {
    const stats = await User.aggregate([
      {
        $group: {
          _id: "$kycStatus",
          count: { $sum: 1 },
        },
      },
    ])

    const formattedStats = {
      incomplete: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
    }

    stats.forEach((stat) => {
      formattedStats[stat._id] = stat.count
    })

    res.status(200).json({
      success: true,
      message: "KYC statistics fetched successfully",
      data: formattedStats,
    })
  } catch (error) {
    console.error("Get KYC Stats Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

// Verify PAN Document
export const verifyPanDocument = async (req, res) => {
  try {
    const { userId } = req.params
    const { status, rejectionReason } = req.body

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'verified' or 'rejected'",
      })
    }

    if (status === "rejected" && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required when rejecting document",
      })
    }

    const updateData = {
      panVerificationStatus: status,
    }

    if (status === "rejected") {
      updateData.panRejectionReason = rejectionReason
    } else {
      updateData.panRejectionReason = ""
    }

    const updatedUser = await User.findOneAndUpdate({ userId }, { $set: updateData }, { new: true }).select(
      "-password -__v",
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: `PAN document ${status} successfully`,
      data: {
        userId: updatedUser.userId,
        panVerificationStatus: updatedUser.panVerificationStatus,
        panRejectionReason: updatedUser.panRejectionReason,
      },
    })
  } catch (error) {
    console.error("Verify PAN Document Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

// Verify Aadhar Document
export const verifyAadharDocument = async (req, res) => {
  try {
    const { userId } = req.params
    const { status, rejectionReason } = req.body

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'verified' or 'rejected'",
      })
    }

    if (status === "rejected" && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required when rejecting document",
      })
    }

    const updateData = {
      aadharVerificationStatus: status,
    }

    if (status === "rejected") {
      updateData.aadharRejectionReason = rejectionReason
    } else {
      updateData.aadharRejectionReason = ""
    }

    const updatedUser = await User.findOneAndUpdate({ userId }, { $set: updateData }, { new: true }).select(
      "-password -__v",
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: `Aadhar document ${status} successfully`,
      data: {
        userId: updatedUser.userId,
        aadharVerificationStatus: updatedUser.aadharVerificationStatus,
        aadharRejectionReason: updatedUser.aadharRejectionReason,
      },
    })
  } catch (error) {
    console.error("Verify Aadhar Document Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

// Verify Passbook Document
export const verifyPassbookDocument = async (req, res) => {
  try {
    const { userId } = req.params
    const { status, rejectionReason } = req.body

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'verified' or 'rejected'",
      })
    }

    if (status === "rejected" && !rejectionReason) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required when rejecting document",
      })
    }

    const updateData = {
      passbookVerificationStatus: status,
    }

    if (status === "rejected") {
      updateData.passbookRejectionReason = rejectionReason
    } else {
      updateData.passbookRejectionReason = ""
    }

    const updatedUser = await User.findOneAndUpdate({ userId }, { $set: updateData }, { new: true }).select(
      "-password -__v",
    )

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: `Passbook document ${status} successfully`,
      data: {
        userId: updatedUser.userId,
        passbookVerificationStatus: updatedUser.passbookVerificationStatus,
        passbookRejectionReason: updatedUser.passbookRejectionReason,
      },
    })
  } catch (error) {
    console.error("Verify Passbook Document Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}

// Get Users by Verification Status
export const getUsersByVerificationStatus = async (req, res) => {
  try {
    const { documentType, status } = req.query

    if (!documentType || !status) {
      return res.status(400).json({
        success: false,
        message: "Document type and status are required",
      })
    }

    if (!["pan", "aadhar", "passbook"].includes(documentType)) {
      return res.status(400).json({
        success: false,
        message: "Document type must be 'pan', 'aadhar', or 'passbook'",
      })
    }

    if (!["incomplete", "processing", "verified", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'incomplete', 'processing', 'verified', or 'rejected'",
      })
    }

    const filterField = `${documentType}VerificationStatus`
    const filter = { [filterField]: status }

    const users = await User.find(filter).select("-password -__v").sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: `Users with ${documentType} status '${status}' fetched successfully`,
      data: users,
    })
  } catch (error) {
    console.error("Get Users by Verification Status Error:", error)
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    })
  }
}
