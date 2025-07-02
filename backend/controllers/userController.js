import User from "../models/User.js";
import { customAlphabet } from "nanoid";

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
      user: {
        userId: user.userId,
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
        coinsEarned: user.coinsEarned,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
