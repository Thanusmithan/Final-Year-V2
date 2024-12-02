// User.js--------------------------------------Corrected-----------------------------------------------------
// // models/User.js
// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, unique: true, required: true },
//     phone: { type: String, required: true },
//     password: { type: String, required: true }, // Password is hashed before saving
//     role: { type: String, default: "user" } // New field to define user roles (default is 'user')
// });

// module.exports = mongoose.model("User", userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ["admin", "user"], default: "user" }, // Role can only be 'admin' or 'user'
}, { timestamps: true }); // Automatically add createdAt and updatedAt

module.exports = mongoose.model("User", userSchema);

