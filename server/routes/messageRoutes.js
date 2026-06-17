// routes/messageRoutes.js
const express = require('express');
const { 
  getAiStatus,
  createMessage, 
  getUserMessages, 
  getMessageById,
  updateMessage,
  deleteMessage
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// All routes are protected
router.get('/ai-status', protect, getAiStatus);

router.route('/')
  .post(protect, createMessage)
  .get(protect, getUserMessages);

router.route('/:id')
  .get(protect, getMessageById)
  .put(protect, updateMessage)
  .delete(protect, deleteMessage);

module.exports = router;
