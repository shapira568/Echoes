const express = require('express');
const { createReminder, getReminders } = require('../controllers/reminderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createReminder);
router.get('/', protect, getReminders);

module.exports = router;
