const Symptom = require('../models/Symptom');

exports.createSymptom = async (req, res) => {
  try {
    const { name, severity, duration, triggered } = req.body;
    const symptom = await Symptom.create({
      userId: req.user.id,
      name,
      severity,
      duration,
      triggered: Boolean(triggered)
    });
    res.status(201).json(symptom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']]
    });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
