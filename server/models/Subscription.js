const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Subscription = sequelize.define('Subscription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  plan: {
    type: DataTypes.ENUM('free', 'premium', 'pro'),
    defaultValue: 'free'
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  endDate: {
    type: DataTypes.DATE
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  stripeCustomerId: {
    type: DataTypes.STRING
  },
  stripeSubscriptionId: {
    type: DataTypes.STRING
  },
  paymentProvider: {
    type: DataTypes.STRING
  },
  paymentReference: {
    type: DataTypes.STRING
  }
}, { timestamps: true });

module.exports = Subscription;
