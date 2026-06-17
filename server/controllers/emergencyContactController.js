const EmergencyContact = require('../models/EmergencyContact');

exports.createEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relationship } = req.body;
    const contact = await EmergencyContact.create({
      userId: req.user.id,
      name,
      phone,
      relationship
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmergencyContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
