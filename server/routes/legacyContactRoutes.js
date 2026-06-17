const express = require('express');
const { createLegacyContact, getLegacyContacts } = require('../controllers/legacyContactController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createLegacyContact);
router.get('/', protect, getLegacyContacts);

module.exports = router;
