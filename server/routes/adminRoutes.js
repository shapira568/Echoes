const express = require('express');
const { getAdminOverview, getAuditLogs } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/overview', protect, getAdminOverview);
router.get('/logs', protect, getAuditLogs);

module.exports = router;
