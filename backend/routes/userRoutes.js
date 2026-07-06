const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Register User
router.post("/register", async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        const user = new User({
            name,
            email,
            phone,
            password
        });

        await user.save();

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;