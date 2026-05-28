
const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: String,
    enum: ['free', 'premium', 'pro'],
    default: 'free'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stripeCustomerId: {
    type: String
  },// models/Subscription.js
  stripeSubscriptionId: {
    type: String
  }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);