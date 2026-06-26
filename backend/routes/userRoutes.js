
const express = require("express");
const router = express.Router();

const User = require("../models/User");

// ===============================
// Register User
// ===============================

router.post("/register", async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered!"
            });
        }

        const user = await User.create({
            name,
            email,
            phone,
            password
        });

        res.status(201).json({
            message: "Registration Successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// ===============================
// Login User
// ===============================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// ===============================
// Export Router
// ===============================

module.exports = router;

