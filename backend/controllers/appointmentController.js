// // controllers/appointmentController.js--------------------------------corrected-----------------------------------
// const Appointment = require("../models/Appointment");

// exports.createAppointment = async (req, res) => {
//     try {
//         const { patientName, age, gender, date, time, doctor, service } = req.body;

//         // Basic validation
//         if (!patientName || !age || !gender || !date || !time || !doctor || !service) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const newAppointment = new Appointment(req.body);
//         await newAppointment.save();
//         res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
//     } catch (error) {
//         console.error("Error creating appointment:", error);
//         res.status(500).json({ message: "Failed to create appointment", error });
//     }
// };

// // Get all appointments
// exports.getAppointments = async (req, res) => {
//     try {
//         const appointments = await Appointment.find();
//         res.status(200).json(appointments);
//     } catch (error) {
//         console.error("Error fetching appointments:", error);
//         res.status(500).json({ message: "Failed to retrieve appointments", error });
//     }
// };

// // Update an existing appointment
// exports.updateAppointment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
//         if (!updatedAppointment) {
//             return res.status(404).json({ message: "Appointment not found" });
//         }
//         res.status(200).json({ message: "Appointment updated successfully", appointment: updatedAppointment });
//     } catch (error) {
//         console.error("Error updating appointment:", error);
//         res.status(500).json({ message: "Failed to update appointment", error });
//     }
// };

// // Delete an appointment
// exports.deleteAppointment = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedAppointment = await Appointment.findByIdAndDelete(id);
//         if (!deletedAppointment) {
//             return res.status(404).json({ message: "Appointment not found" });
//         }
//         res.status(200).json({ message: "Appointment deleted successfully", id });
//     } catch (error) {
//         console.error("Error deleting appointment:", error);
//         res.status(500).json({ message: "Failed to delete appointment", error });
//     }
// };




// // controllers/appointmentController.js
// const Appointment = require("../models/Appointment");

// exports.createAppointment = async (req, res) => {
//     try {
//         const { patientName, age, gender, date, time, doctor, service } = req.body;

//         // Basic validation
//         if (!patientName || !age || !gender || !date || !time || !doctor || !service) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Check if an appointment already exists at the same date, time, and doctor
//         const existingAppointment = await Appointment.findOne({ date, time, doctor });
//         if (existingAppointment) {
//             return res.status(400).json({ message: "This doctor is already booked at the selected time." });
//         }

//         const newAppointment = new Appointment(req.body);
//         await newAppointment.save();
//         res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
//     } catch (error) {
//         if (error.code === 11000) {
//             return res.status(400).json({ message: "This doctor is already booked at the selected time." });
//         }
//         console.error("Error creating appointment:", error);
//         res.status(500).json({ message: "Failed to create appointment", error });
//     }
// };



// controllers/appointmentController.js
const Appointment = require("../models/Appointment");

// Create an appointment
exports.createAppointment = async (req, res) => {
    try {
        const { patientName, age, gender, date, time, doctor, service } = req.body;

        // Basic validation
        if (!patientName || !age || !gender || !date || !time || !doctor || !service) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if an appointment already exists for the given date, time, and doctor
        const existingAppointment = await Appointment.findOne({ date, time, doctor });
        if (existingAppointment) {
            return res.status(400).json({ message: "This doctor is already booked at the selected time." });
        }

        // Create and save the new appointment
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();

        res.status(201).json({
            message: "Appointment created successfully.",
            appointment: newAppointment,
        });
    } catch (error) {
        console.error("Error creating appointment:", error);

        // Handle duplicate error specifically
        if (error.code === 11000) {
            return res.status(400).json({ message: "This doctor is already booked at the selected time." });
        }

        res.status(500).json({ message: "Failed to create appointment.", error });
    }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ message: "Failed to retrieve appointments.", error });
    }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if the appointment exists
        const existingAppointment = await Appointment.findById(id);
        if (!existingAppointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        // Update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            message: "Appointment updated successfully.",
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error("Error updating appointment:", error);
        res.status(500).json({ message: "Failed to update appointment.", error });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the appointment
        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        res.status(200).json({
            message: "Appointment deleted successfully.",
            id,
        });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        res.status(500).json({ message: "Failed to delete appointment.", error });
    }
};
