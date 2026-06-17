const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Therapist = sequelize.define('Therapist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  licenseNo: {
    type: DataTypes.STRING
  },
  specialty: {
    type: DataTypes.STRING
  }
}, { timestamps: true });

module.exports = Therapist;
