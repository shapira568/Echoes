const express = require('express');
const { createMedication, getMedications } = require('../controllers/medicationController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createMedication);
router.get('/', protect, getMedications);

module.exports = router;
