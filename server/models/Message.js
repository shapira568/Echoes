// models/Message.js - This file should ONLY contain the model definition
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'voice', 'video'],
    default: 'text'
  },
  deliveryMethod: {
    type: String,
    enum: ['date', 'event', 'emotion'],
    required: true
  },
  deliveryDate: {
    type: Date
  },
  lifeEvent: {
    type: String
  },
  emotionalState: {
    type: String
  },
  recipient: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'draft'],
    default: 'pending'
  },
  aiEnhanced: {
    type: Boolean,
    default: false
  },
  mediaUrl: {
    type: String
  },
  mediaType: {
    type: String,
    enum: ['audio', 'video']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export the model correctly
module.exports = mongoose.model('Message', messageSchema);