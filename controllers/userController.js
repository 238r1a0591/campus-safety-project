

// =======================
// REGISTER USER
// =======================
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const bcrypt = require('bcryptjs');

// inside your register controller
const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  name,
  email,
  phone,
  password: hashedPassword
});
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

        const bcrypt = require('bcryptjs');

        const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
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