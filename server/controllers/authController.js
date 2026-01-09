// server/controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || "7d" }
  );
};

exports.clerkSync = async (req, res) => {
  try {
    const { clerkId, email, name } = req.body;
    if (!clerkId) return res.status(400).json({ message: "clerkId is required" });

    let user = await User.findOne({ clerkId });

    if (!user) {
      // Create user if they don't exist yet (backup for webhook delay)
      user = new User({ clerkId, email, name, role: 'user' });
      await user.save();
    }

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, clerkId: user.clerkId, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Sync error", error: err.message });
  }
};
