const MoodEntry = require('../models/MoodEntry');
const { Op } = require('sequelize');

exports.logMood = async (req, res) => {
  try {
    const { mood, intensity, notes, reason, team, profilePhoto, interventionLevel, tags } = req.body;
    const entry = await MoodEntry.create({
      userId: req.user.id,
      mood,
      intensity,
      notes,
      reason,
      team,
      profilePhoto,
      interventionLevel: interventionLevel || 'none',
      tags: tags || []
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMoodHistory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = { userId: req.user.id };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }
    
    const entries = await MoodEntry.findAll({
      where,
      order: [['date', 'DESC']]
    });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMoodStats = async (req, res) => {
  try {
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);
    
    const entries = await MoodEntry.findAll({
      where: {
        userId: req.user.id,
        date: { [Op.gte]: last30Days }
      }
    });
    
    const moodCounts = {};
    const teamCounts = {};
    const interventionCounts = { none: 0, algorithm: 0, management: 0 };
    entries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      if (entry.team) teamCounts[entry.team] = (teamCounts[entry.team] || 0) + 1;
      interventionCounts[entry.interventionLevel] = (interventionCounts[entry.interventionLevel] || 0) + 1;
    });
    
    const avgIntensity = entries.reduce((sum, e) => sum + e.intensity, 0) / entries.length || 0;
    
    res.json({
      moodCounts,
      teamCounts,
      interventionCounts,
      avgIntensity: avgIntensity.toFixed(2),
      totalEntries: entries.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
