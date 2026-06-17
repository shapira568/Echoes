const express = require('express');
const { createTrigger, getTriggers } = require('../controllers/triggerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTrigger);
router.get('/', protect, getTriggers);

module.exports = router;
