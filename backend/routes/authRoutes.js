// authRoutes.js-------------------corrected--------------------------------------------
// authRoutes.js
// const express = require("express");
// const { register, login, updateUser } = require("../controllers/authController");
// const { verifyToken } = require("../middleware/authMiddleware");
// const router = express.Router();

// router.post("/signup", register); // POST route for signup
// router.post("/login", (req, res) => {
//     req.body.isAdmin = false; // Regular user login
//     login(req, res);
// });
// router.post("/admin/login", (req, res) => {
//     req.body.isAdmin = true; // Admin login
//     login(req, res);
// });
// router.put("/update", verifyToken, updateUser); // PUT route for updating profile

// module.exports = router;



// authRoutes.js
const express = require("express");
const { register, login, updateUser } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// User Signup Route
router.post("/signup", register); // POST route for user registration

// Regular User Login Route
router.post("/login", (req, res) => {
  console.log("Regular user login attempt."); // Debug log
  req.body.isAdmin = false; // Set role for regular users
  login(req, res);
});

// Admin Login Route
router.post("/admin/login", (req, res) => {
  console.log("Admin login attempt."); // Debug log
  req.body.isAdmin = true; // Set role for admin users
  login(req, res);
});

// Update User Profile Route
router.put("/update", verifyToken, updateUser); // PUT route for updating profile

module.exports = router;
