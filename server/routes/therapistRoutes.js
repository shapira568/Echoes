const express = require('express');
const { createTherapist, getTherapists } = require('../controllers/therapistController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTherapist);
router.get('/', protect, getTherapists);

module.exports = router;
