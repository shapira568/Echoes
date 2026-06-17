const express = require('express');
const { createGoal, getGoals } = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createGoal);
router.get('/', protect, getGoals);

module.exports = router;
