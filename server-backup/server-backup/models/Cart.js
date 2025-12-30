const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    }
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

cartSchema.pre('save', function(next) {
  this.totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
  this.totalAmount = this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  next();
});

module.exports = mongoose.model('Cart', cartSchema);