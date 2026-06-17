const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Trigger = sequelize.define('Trigger', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('stress', 'anxiety', 'depression', 'panic', 'other'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  copingStrategy: {
    type: DataTypes.TEXT
  },
  frequency: {
    type: DataTypes.STRING
  }
}, { timestamps: true });

module.exports = Trigger;