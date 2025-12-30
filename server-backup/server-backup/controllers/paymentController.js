
const stripe = require("../config/payment"); 
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

// Create Stripe payment intent
exports.createStripePayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate("user");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user._id.toString() !== req.user.id) return res.status(403).json({ message: "Access denied" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100),
      currency: process.env.CURRENCY || "usd",
      metadata: {
        orderId: order._id.toString(),
        userId: req.user.id,
      },
    });

    const transaction = new Transaction({
      order: order._id,
      user: req.user.id,
      amount: order.totalAmount,
      paymentMethod: "card",
      paymentGateway: "stripe",
      gatewayTransactionId: paymentIntent.id,
      status: "pending",
    });
    await transaction.save();

    res.json({ clientSecret: paymentIntent.client_secret, transactionId: transaction._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Confirm Stripe payment (client calls this after success)
exports.confirmStripePayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      await Order.findByIdAndUpdate(orderId, { paymentStatus: "completed", orderStatus: "confirmed" });
      await Transaction.findOneAndUpdate({ gatewayTransactionId: paymentIntentId }, { status: "success" });

      const order = await Order.findById(orderId);
      for (let item of order.items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      }

      return res.json({ message: "Payment successful", orderId });
    }

    res.status(400).json({ message: "Payment not completed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Stripe webhook
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await Order.findOneAndUpdate({ _id: paymentIntent.metadata.orderId }, { paymentStatus: "completed", orderStatus: "confirmed" });
    await Transaction.findOneAndUpdate({ gatewayTransactionId: paymentIntent.id }, { status: "success" });

    // decrement stock
    const order = await Order.findById(paymentIntent.metadata.orderId);
    if (order) {
      for (let item of order.items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
      }
    }
  }

  res.json({ received: true });
};
