const express = require('express');
const { createSymptom, getSymptoms } = require('../controllers/symptomController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createSymptom);
router.get('/', protect, getSymptoms);

module.exports = router;
