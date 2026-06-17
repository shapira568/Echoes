const Trigger = require('../models/Trigger');

exports.createTrigger = async (req, res) => {
  try {
    const { name, type, description, copingStrategy, frequency } = req.body;
    const trigger = await Trigger.create({
      userId: req.user.id,
      name,
      type,
      description,
      copingStrategy,
      frequency
    });
    res.status(201).json(trigger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTriggers = async (req, res) => {
  try {
    const triggers = await Trigger.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(triggers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
