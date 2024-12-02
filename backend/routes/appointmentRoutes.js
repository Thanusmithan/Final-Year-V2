// // routes/appointmentRoutes.js---------------------------Corrected---------------------------------------------
// const express = require("express");
// const {
//     createAppointment,
//     getAppointments,
//     updateAppointment,
//     deleteAppointment,
// } = require("../controllers/appointmentController");
// const router = express.Router();

// router.post("/", createAppointment); // Create an appointment
// router.get("/", getAppointments); // Get all appointments
// router.put("/:id", updateAppointment); // Update an appointment by ID
// router.delete("/:id", deleteAppointment); // Delete an appointment by ID

// module.exports = router;



// routes/appointmentRoutes.js
const express = require("express");
const {
    createAppointment,
    getAppointments,
    updateAppointment,
    deleteAppointment,
} = require("../controllers/appointmentController");

const router = express.Router();

// Route to create an appointment
router.post("/", createAppointment);

// Route to get all appointments
router.get("/", getAppointments);

// Route to update an appointment by ID
router.put("/:id", updateAppointment);

// Route to delete an appointment by ID
router.delete("/:id", deleteAppointment);

module.exports = router;
