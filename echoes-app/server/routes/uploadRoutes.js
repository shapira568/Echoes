// routes/uploadRoutes.js
const express = require('express');
const { upload } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Upload media file
router.post('/media', protect, upload.single('media'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename
  });
});

module.exports = router;