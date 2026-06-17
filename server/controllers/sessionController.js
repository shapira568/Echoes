const Session = require('../models/Session');
const Therapist = require('../models/Therapist');

exports.createSession = async (req, res) => {
  try {
    const { therapistId, therapistName, therapistLicenseNo, therapistSpecialty, date, notes } = req.body;
    let resolvedTherapistId = therapistId || null;

    if (!resolvedTherapistId && therapistName) {
      const therapist = await Therapist.create({
        name: therapistName,
        licenseNo: therapistLicenseNo,
        specialty: therapistSpecialty
      });
      resolvedTherapistId = therapist.id;
    }

    const session = await Session.create({
      userId: req.user.id,
      therapistId: resolvedTherapistId,
      date,
      notes
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { userId: req.user.id },
      include: [{ model: Therapist, as: 'therapist' }],
      order: [['date', 'DESC']]
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
