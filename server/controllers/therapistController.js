const Therapist = require('../models/Therapist');

exports.createTherapist = async (req, res) => {
  try {
    const { name, licenseNo, specialty } = req.body;
    const therapist = await Therapist.create({ name, licenseNo, specialty });
    res.status(201).json(therapist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.findAll({
      order: [['name', 'ASC']]
    });
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
