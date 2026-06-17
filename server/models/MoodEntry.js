const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const MoodEntry = sequelize.define('MoodEntry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  intensity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 10 }
  },
  notes: {
    type: DataTypes.TEXT
  },
  reason: {
    type: DataTypes.TEXT
  },
  team: {
    type: DataTypes.STRING
  },
  profilePhoto: {
    type: DataTypes.STRING
  },
  interventionLevel: {
    type: DataTypes.ENUM('none', 'algorithm', 'management'),
    defaultValue: 'none'
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { timestamps: true });

module.exports = MoodEntry;
