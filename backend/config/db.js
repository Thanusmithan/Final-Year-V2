// //config/db.js---------------------------------------Corrected------------------------------------------------
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI); // No additional options needed
//     console.log(`MongoDB connected successfully: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);

//     // Provide suggestions for common issues
//     if (error.message.includes("ECONNREFUSED")) {
//       console.error(
//         "Connection refused! Ensure MongoDB is running and accessible."
//       );
//     } else if (error.message.includes("authentication failed")) {
//       console.error(
//         "Authentication failed! Verify your username, password, and database name."
//       );
//     } else if (error.message.includes("ENOTFOUND")) {
//       console.error(
//         "Host not found! Verify your MongoDB URI or DNS configuration."
//       );
//     }

//     process.exit(1); // Exit the process with failure code
//   }
// };

// module.exports = connectDB;



// // config/db.js -------------------------- Updated and Enhanced -----------------------------------
// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     // Connect to MongoDB without deprecated options
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB connected successfully: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);

//     // Provide suggestions for common issues
//     if (error.message.includes("ECONNREFUSED")) {
//       console.error(
//         "Connection refused! Ensure MongoDB is running and accessible."
//       );
//     } else if (error.message.includes("authentication failed")) {
//       console.error(
//         "Authentication failed! Verify your username, password, and database name."
//       );
//     } else if (error.message.includes("ENOTFOUND")) {
//       console.error(
//         "Host not found! Verify your MongoDB URI or DNS configuration."
//       );
//     }

//     process.exit(1); // Exit the process with failure code
//   }
// };

// module.exports = connectDB;




//config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Establish connection to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);

        // Provide detailed suggestions for common connection issues
        if (error.message.includes('ECONNREFUSED')) {
            console.error('Connection refused! Ensure MongoDB is running and accessible.');
        } else if (error.message.includes('authentication failed')) {
            console.error('Authentication failed! Verify your username, password, and database name.');
        } else if (error.message.includes('ENOTFOUND')) {
            console.error('Host not found! Verify your MongoDB URI or DNS configuration.');
        }

        // Exit the process with failure code
        process.exit(1);
    }
};

module.exports = connectDB;
