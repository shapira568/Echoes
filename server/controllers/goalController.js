const Goal = require('../models/Goal');

exports.createGoal = async (req, res) => {
  try {
    const { description, targetDate, status } = req.body;
    const goal = await Goal.create({
      userId: req.user.id,
      description,
      targetDate: targetDate || null,
      status: status || 'active'
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
