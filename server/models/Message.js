const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  messageType: {
    type: DataTypes.ENUM('text', 'voice', 'video'),
    defaultValue: 'text'
  },
  deliveryMethod: {
    type: DataTypes.ENUM('date', 'event', 'emotion'),
    allowNull: false
  },
  deliveryDate: {
    type: DataTypes.DATE
  },
  lifeEvent: {
    type: DataTypes.STRING
  },
  emotionalState: {
    type: DataTypes.STRING
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'delivered', 'draft'),
    defaultValue: 'pending'
  },
  aiEnhanced: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  mediaUrl: {
    type: DataTypes.STRING
  },
  mediaType: {
    type: DataTypes.ENUM('audio', 'video')
  }
}, { timestamps: true });

module.exports = Message;
