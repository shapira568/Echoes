// routes/paymentRoutes.js
const express = require('express');
const { 
  createCheckoutSession,
  createSubscription,
  getSubscription
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
router.post('/create-subscription', protect, createSubscription);
router.get('/subscription', protect, getSubscription);

module.exports = router;