const express = require('express');
const { createJournal, getJournals } = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createJournal);
router.get('/', protect, getJournals);

module.exports = router;