import Product from "../models/Product.js"
import User from "../models/User.js"
import Category from "../models/Category.js"
import cloudinary from "../helpers/cloudinary/cloudinary.js"
import { customAlphabet } from "nanoid"
import qrcode from "qrcode"

const generateProductId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10)

// Helper to upload QR to Cloudinary
const uploadQRToCloudinary = async (data) => {
  try {
    const qrImage = await qrcode.toDataURL(data, {
      errorCorrectionLevel: "H",
      type: "image/png",
      margin: 2,
      width: 300, // Larger QR for better scanning
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    })
    const result = await cloudinary.uploader.upload(qrImage, {
      folder: "kkd/qrcodes",
    })
    return result.secure_url
  } catch (err) {
    console.error("QR Code Upload Error:", err)
    throw new Error("Failed to generate or upload QR code.")
  }
}

// 🚀 ADMIN: Add a new product
export const addProduct = async (req, res) => {
  try {
    const { productName, categoryId, coinReward } = req.body

    if (!productName || !categoryId || !coinReward || !req.file) {
      return res.status(400).json({
        success: false,
        message: "Product name, category, coin reward, and image are required.",
      })
    }

    const category = await Category.findById(categoryId)
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found." })
    }

    const productId = `PROD_${generateProductId()}`
    const qrData = {
      productId,
      type: "PRODUCT_QR",
      timestamp: Date.now(),
      // Add a simple hash for basic validation
      hash: Buffer.from(`${productId}-${Date.now()}-KKD_SECRET`).toString("base64").slice(0, 16),
    }
    const qrCodeImage = await uploadQRToCloudinary(JSON.stringify(qrData))

    const newProduct = new Product({
      productId,
      productName,
      category: categoryId,
      coinReward,
      productImage: req.file.path,
      qrCodeImage,
    })

    await newProduct.save()

    res.status(201).json({
      success: true,
      message: "Product added successfully with a unique QR code.",
      data: newProduct,
    })
  } catch (error) {
    console.error("Add Product Error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// 🚀 ADMIN: Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "categoryName").sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      message: "Products fetched successfully.",
      data: products,
    })
  } catch (error) {
    console.error("Get All Products Error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// 🚀 ADMIN: Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { productName, categoryId, coinReward } = req.body

    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." })
    }

    if (productName) product.productName = productName
    if (categoryId) product.category = categoryId
    if (coinReward) product.coinReward = coinReward

    if (req.file) {
      // Optional: Delete old image from Cloudinary
      product.productImage = req.file.path
    }

    await product.save()

    res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product,
    })
  } catch (error) {
    console.error("Update Product Error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// 🚀 ADMIN: Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id)

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." })
    }

    // Delete images from Cloudinary
    const productImagePublicId = `kkd/products/${product.productImage.split("/").pop().split(".")[0]}`
    const qrImagePublicId = `kkd/qrcodes/${product.qrCodeImage.split("/").pop().split(".")[0]}`

    await Promise.all([cloudinary.uploader.destroy(productImagePublicId), cloudinary.uploader.destroy(qrImagePublicId)])

    res.status(200).json({ success: true, message: "Product and its QR code deleted successfully." })
  } catch (error) {
    console.error("Delete Product Error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// 🚀 ADMIN: Toggle product QR status
export const toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." })
    }

    if (product.qrStatus === "scanned") {
      return res.status(400).json({ success: false, message: "Cannot change status of an already scanned QR." })
    }

    product.qrStatus = product.qrStatus === "active" ? "disabled" : "active"
    await product.save()

    res.status(200).json({
      success: true,
      message: `Product status changed to ${product.qrStatus}.`,
      data: product,
    })
  } catch (error) {
    console.error("Toggle Product Status Error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// 🚀 NEW: ADMIN: Test QR scanning (for admin testing purposes)
export const testQRScan = async (req, res) => {
  try {
    const { qrData, testUserId } = req.body

    if (!qrData) {
      return res.status(400).json({
        success: false,
        message: "QR data is required.",
      })
    }

    // Parse QR data
    let parsedData
    try {
      parsedData = JSON.parse(qrData)
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Invalid QR code format.",
      })
    }

    // Validate QR structure
    if (!parsedData.productId || parsedData.type !== "PRODUCT_QR") {
      return res.status(400).json({
        success: false,
        message: "Invalid QR code. This is not a valid product QR.",
      })
    }

    const product = await Product.findOne({ productId: parsedData.productId })
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found. Invalid QR code.",
      })
    }

    if (product.qrStatus !== "active") {
      const message =
        product.qrStatus === "scanned" ? "This QR code has already been used." : "This QR code is currently inactive."
      return res.status(400).json({ success: false, message })
    }

    // For testing, we can either:
    // 1. Use a test user ID if provided
    // 2. Just validate the QR without actually updating anything
    // 3. Create a mock response

    if (testUserId) {
      // Test with specific user
      const user = await User.findOne({ userId: testUserId })
      if (!user) {
        return res.status(404).json({ success: false, message: "Test user not found." })
      }

      // Check if user already scanned this product
      if (user.productsQrScanned.includes(product.productId)) {
        return res.status(400).json({
          success: false,
          message: "This test user has already scanned this product.",
        })
      }

      // Update product status
      product.qrStatus = "scanned"
      product.scannedBy = user._id
      product.scannedAt = new Date()

      // Update user coins
      user.coinsEarned += product.coinReward
      user.productsQrScanned.push(product.productId)

      await Promise.all([product.save(), user.save()])

      res.status(200).json({
        success: true,
        message: `✅ QR Test Successful! ${product.coinReward} coins would be awarded for scanning ${product.productName}.`,
        data: {
          productName: product.productName,
          coinsEarned: product.coinReward,
          totalCoins: user.coinsEarned,
          scannedAt: product.scannedAt,
          testUserId: user.userId,
        },
      })
    } else {
      // Just validate QR without updating anything
      res.status(200).json({
        success: true,
        message: `✅ QR Validation Successful! This QR would award ${product.coinReward} coins for ${product.productName}.`,
        data: {
          productName: product.productName,
          productId: product.productId,
          coinsEarned: product.coinReward,
          qrStatus: product.qrStatus,
          isValid: true,
          testMode: true,
        },
      })
    }
  } catch (error) {
    console.error("Test QR Scan Error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}

// 🚀 USER: Scan a product QR code
export const scanProductQR = async (req, res) => {
  try {
    const { qrData } = req.body // Changed from productId to qrData
    const userId = req.user.userId

    if (!qrData) {
      return res.status(400).json({
        success: false,
        message: "QR data is required.",
      })
    }

    // Parse QR data
    let parsedData
    try {
      parsedData = JSON.parse(qrData)
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Invalid QR code format.",
      })
    }

    // Validate QR structure
    if (!parsedData.productId || parsedData.type !== "PRODUCT_QR") {
      return res.status(400).json({
        success: false,
        message: "Invalid QR code. This is not a valid product QR.",
      })
    }

    const product = await Product.findOne({ productId: parsedData.productId })
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found. Invalid QR code.",
      })
    }

    if (product.qrStatus !== "active") {
      const message =
        product.qrStatus === "scanned" ? "This QR code has already been used." : "This QR code is currently inactive."
      return res.status(400).json({ success: false, message })
    }

    const user = await User.findOne({ userId })
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." })
    }

    // Check if user already scanned this product
    if (user.productsQrScanned.includes(product.productId)) {
      return res.status(400).json({
        success: false,
        message: "You have already scanned this product.",
      })
    }

    // Update product status
    product.qrStatus = "scanned"
    product.scannedBy = user._id
    product.scannedAt = new Date()

    // Update user coins
    user.coinsEarned += product.coinReward
    user.productsQrScanned.push(product.productId)

    await Promise.all([product.save(), user.save()])

    res.status(200).json({
      success: true,
      message: `Congratulations! You've earned ${product.coinReward} coins for scanning ${product.productName}.`,
      data: {
        productName: product.productName,
        coinsEarned: product.coinReward,
        totalCoins: user.coinsEarned,
        scannedAt: product.scannedAt,
      },
    })
  } catch (error) {
    console.error("Scan QR Error:", error)
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
}
