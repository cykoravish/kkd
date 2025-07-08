import jwt from "jsonwebtoken";
import Category from "../models/Category.js";

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
