const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentGateway: {
    type: String,
    enum: ['stripe', 'razorpay'],
    required: true
  },
  gatewayTransactionId: String,
  status: {
    type: String,
    enum: ['pending', 'success', 'failed', 'refunded'],
    default: 'pending'
  },
  gatewayResponse: Object
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);