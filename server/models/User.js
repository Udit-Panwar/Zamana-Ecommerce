const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    trim: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },

  phone: String,

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
