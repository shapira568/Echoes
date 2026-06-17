const express = require('express');
const { logMood, getMoodHistory, getMoodStats } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/log', protect, logMood);
router.get('/history', protect, getMoodHistory);
router.get('/stats', protect, getMoodStats);

module.exports = router;