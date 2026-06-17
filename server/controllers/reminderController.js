const Reminder = require('../models/Reminder');

exports.createReminder = async (req, res) => {
  try {
    const { medicationId, time, message } = req.body;
    const reminder = await Reminder.create({
      userId: req.user.id,
      medicationId: medicationId || null,
      time,
      message
    });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({
      where: { userId: req.user.id },
      order: [['time', 'ASC']]
    });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
