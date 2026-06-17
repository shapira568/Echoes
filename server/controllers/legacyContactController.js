const LegacyContact = require('../models/LegacyContact');
const { recordAudit } = require('../utils/audit');

exports.createLegacyContact = async (req, res) => {
  try {
    const { contactName, contactEmail, isVerified } = req.body;
    const contact = await LegacyContact.create({
      userId: req.user.id,
      contactName,
      contactEmail,
      isVerified: Boolean(isVerified)
    });
    await recordAudit(req, 'legacy_contact_created');
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLegacyContacts = async (req, res) => {
  try {
    const contacts = await LegacyContact.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
