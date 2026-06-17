const Medication = require('../models/Medication');

exports.createMedication = async (req, res) => {
  try {
    const { name, dosage, frequency, startTime, reminders, isActive, notes } = req.body;
    const medication = await Medication.create({
      userId: req.user.id,
      name,
      dosage,
      frequency,
      startTime,
      reminders: reminders || [],
      isActive: isActive !== undefined ? isActive : true,
      notes
    });
    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMedications = async (req, res) => {
  try {
    const medications = await Medication.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
