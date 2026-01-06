// server.js (root of server folder)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const paymentRoutes = require("./routes/payment");
const authRoutes = require("./routes/auth");
const { clerkWebhooks } = require("./controllers/webhooks");


connectDB();

const app = express();

// ---- RAW BODY FOR WEBHOOKS (Clerk + Stripe) ----
app.post("/api/webhooks/clerk", express.raw({ type: "application/json" }));
app.post("/api/payment/stripe/webhook", express.raw({ type: "application/json" }));

// ---- Normal JSON for rest ----
app.use(express.json());

// CORS
app.use(cors({ origin: "*", credentials: true }));

app.use('/webhooks',clerkWebhooks)

// ---- Normal Routes ----
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "ZAMANA Backend API Running",
    version: "1.0.0",
    time: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log("✔ Server running on port:", PORT));
