import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Ensure this path is correct

const router = express.Router();

console.log("✅ authRoutes.js is loaded");

// User Registration
router.post("/register", async (req, res) => {
  try {
    console.log("📌 Received Registration Request", req.body);

    const { name, email, password, role = "student" } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    console.log("✅ User Registered:", user.email);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  try {
    console.log("📌 Received Login Request", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      console.log("⚠️ Invalid login attempt - user not found:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("⚠️ Invalid login attempt - incorrect password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is not set in .env file!");
      return res.status(500).json({ message: "Server Configuration Error" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Login Successful for:", email);
    res.json({ token, user });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
