const express = require('express');
const { createSession, getSessions } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createSession);
router.get('/', protect, getSessions);

module.exports = router;
