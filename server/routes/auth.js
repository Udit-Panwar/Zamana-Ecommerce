// server/routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/clerk-sync", authController.clerkSync);

module.exports = router;
