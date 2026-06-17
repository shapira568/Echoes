const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Symptom = sequelize.define('Symptom', {
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
  severity: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 10 }
  },
  duration: {
    type: DataTypes.STRING
  },
  triggered: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { timestamps: true });

module.exports = Symptom;