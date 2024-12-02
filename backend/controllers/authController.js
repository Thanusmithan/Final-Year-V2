// authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Use a different email to SignUp!" });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save to the database
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: "user", // Default role for new users
    });
    await user.save();

    console.log("User registered successfully:", user._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Enforce admin credentials restriction
    // if (isAdmin && user.role !== "admin") {
    //   return res.status(403).json({ message: "Unauthorized access to admin role" });
    // }

    // if (isAdmin===false && user.role === "admin") {
    //   return res.status(403).json({ message: "Unauthorized access to admin role" });
    // }

    if (isAdmin && user.role !== "admin") {
      return res.status(403).json({ message: "email already exists" });
    }

    if (isAdmin===false && user.role === "admin") {
      return res.status(403).json({ message: "email already exists" });
    }


    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("User logged in:", user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update User Information
exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    const userId = req.user._id;

    // Find user by ID and update details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phone },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully:", updatedUser._id);

    res.json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
