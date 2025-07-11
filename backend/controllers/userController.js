import User from "../models/User.js";
import { customAlphabet } from "nanoid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 16);

export const userSignup = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;

    if (!fullName || !phone || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email or Phone already registered" });
    }

    let user;
    let saved = false;

    while (!saved) {
      try {
        user = new User({
          fullName,
          phone,
          email,
          password,
          userId: nanoid(),
        });

        await user.save();
        saved = true;
      } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.userId) {
          console.warn("Duplicate userId generated, retrying...");
        } else {
          throw err; // some other error
        }
      }
    }

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          userId: user.userId,
          fullName: user.fullName,
          phone: user.phone,
          email: user.email,
          coinsEarned: user.coinsEarned,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password are required",
      });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.user.userId }).select(
      "-password -__v"
    );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User profile fetched",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId
    const updateData = req.body

    // Fields that are NOT allowed to be updated directly
    const restrictedFields = [
      "userId",
      "email",
      "phone",
      "password",
      "coinsEarned",
      "productsQrScanned",
      "isPanVerified",
      "panPhoto",
      "isAadharVerified",
      "aadharPhoto",
      "isPassbookVerified",
      "passbookPhoto",
      "createdAt",
      "updatedAt",
      "__v",
    ]

    // Remove restricted fields from update data
    restrictedFields.forEach((field) => {
      if (updateData[field]) {
        delete updateData[field]
      }
    })

    // Handle profile picture if provided
    if (req.file) {
      updateData.profilePick = req.file.path // Cloudinary URL
    }

    // Validate specific fields if provided
    if (updateData.pinCode && !/^\d{6}$/.test(updateData.pinCode)) {
      return res.status(400).json({
        success: false,
        message: "Pin code must be 6 digits",
      })
    }

    if (updateData.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(updateData.ifscCode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid IFSC code format",
      })
    }

    if (updateData.accountNumber && updateData.accountNumber.length < 9) {
      return res.status(400).json({
        success: false,
        message: "Account number must be at least 9 digits",
      })
    }

    // Validate date of birth format (optional)
    if (updateData.dob && updateData.dob.trim() !== "") {
      const dobRegex = /^\d{4}-\d{2}-\d{2}$|^\d{2}\/\d{2}\/\d{4}$|^\d{2}-\d{2}-\d{4}$/
      if (!dobRegex.test(updateData.dob)) {
        return res.status(400).json({
          success: false,
          message: "Date of birth must be in valid format (YYYY-MM-DD, DD/MM/YYYY, or DD-MM-YYYY)",
        })
      }
    }

    // Find and update user
    const updatedUser = await User.findOneAndUpdate(
      { userId },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password -__v")

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    })
  } catch (error) {
    console.error("Update Profile Error:", error)

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: validationErrors,
      })
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

// change password for future implementation
export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.userId
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters long",
      })
    }

    // Find user with password
    const user = await User.findOne({ userId })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      })
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await User.findOneAndUpdate({ userId }, { $set: { password: hashedNewPassword } })

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error) {
    console.error("Update Password Error:", error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

// 🚀 NEW: Upload PAN Photo
export const uploadPanPhoto = async (req, res) => {
  try {
    const userId = req.user.userId

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "PAN photo is required",
      })
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        $set: {
          panPhoto: req.file.path,
          isPanVerified: false, // Reset verification status when new document is uploaded
        },
      },
      { new: true },
    ).select("-password -__v")

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "PAN photo uploaded successfully",
      data: {
        panPhoto: updatedUser.panPhoto,
        isPanVerified: updatedUser.isPanVerified,
      },
    })
  } catch (error) {
    console.error("Upload PAN Photo Error:", error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

// 🚀 NEW: Upload Aadhar Photo
export const uploadAadharPhoto = async (req, res) => {
  try {
    const userId = req.user.userId

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Aadhar photo is required",
      })
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        $set: {
          aadharPhoto: req.file.path,
          isAadharVerified: false, // Reset verification status when new document is uploaded
        },
      },
      { new: true },
    ).select("-password -__v")

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Aadhar photo uploaded successfully",
      data: {
        aadharPhoto: updatedUser.aadharPhoto,
        isAadharVerified: updatedUser.isAadharVerified,
      },
    })
  } catch (error) {
    console.error("Upload Aadhar Photo Error:", error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}

// 🚀 NEW: Upload Passbook Photo
export const uploadPassbookPhoto = async (req, res) => {
  try {
    const userId = req.user.userId

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Passbook photo is required",
      })
    }

    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        $set: {
          passbookPhoto: req.file.path,
          isPassbookVerified: false, // Reset verification status when new document is uploaded
        },
      },
      { new: true },
    ).select("-password -__v")

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Passbook photo uploaded successfully",
      data: {
        passbookPhoto: updatedUser.passbookPhoto,
        isPassbookVerified: updatedUser.isPassbookVerified,
      },
    })
  } catch (error) {
    console.error("Upload Passbook Photo Error:", error)
    res.status(500).json({
      success: false,
      message: "Server Error",
    })
  }
}
