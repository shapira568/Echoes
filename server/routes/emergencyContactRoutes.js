const express = require('express');
const { createEmergencyContact, getEmergencyContacts } = require('../controllers/emergencyContactController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createEmergencyContact);
router.get('/', protect, getEmergencyContacts);

module.exports = router;
