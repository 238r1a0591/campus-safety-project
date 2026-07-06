const User = require("../models/User");

// =======================
// REGISTER USER
// =======================
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const newUser = new User({ name, email, phone, password });
        await newUser.save();

        res.json({ success: true, message: "User registered successfully" });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

// =======================
// LOGIN USER
// =======================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (user.password !== password) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

module.exports = { registerUser, loginUser };