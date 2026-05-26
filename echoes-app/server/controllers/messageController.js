// controllers/messageController.js
const Message = require('../models/Message');
const { enhanceMessage } = require('../services/aiService');

exports.createMessage = async (req, res) => {
  try {
    // Validate that Message model is properly loaded
    if (!Message || typeof Message.create !== 'function') {
      console.error('Message model is not properly loaded');
      return res.status(500).json({ 
        message: 'Database model error: Message model not loaded correctly' 
      });
    }

    const {
      content,
      messageType,
      deliveryMethod,
      deliveryDate,
      lifeEvent,
      emotionalState,
      recipient,
      aiEnhance = false
    } = req.body;

    // Validate required fields
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    if (!recipient) {
      return res.status(400).json({ message: 'Recipient is required' });
    }

    let enhancedContent = content;
    
    // Apply AI enhancement if requested
    if (aiEnhance) {
      try {
        // Get user's previous messages for context
        const userMessages = await Message.find({ userId: req.user._id })
          .sort({ createdAt: -1 })
          .limit(5);
        
        enhancedContent = await enhanceMessage(content, userMessages);
      } catch (aiError) {
        console.error('AI enhancement error:', aiError);
        // Continue with original content if AI fails
      }
    }

    const message = await Message.create({
      userId: req.user._id,
      content: enhancedContent,
      messageType,
      deliveryMethod,
      deliveryDate,
      lifeEvent,
      emotionalState,
      recipient,
      aiEnhanced: aiEnhance
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Validate that Message model is properly loaded
    if (!Message || typeof Message.find !== 'function') {
      console.error('Message model is not properly loaded');
      return res.status(500).json({ 
        message: 'Database model error: Message model not loaded correctly' 
      });
    }
    
    const messages = await Message.find({ userId: req.user._id });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Validate that Message model is properly loaded
    if (!Message || typeof Message.findById !== 'function') {
      console.error('Message model is not properly loaded');
      return res.status(500).json({ 
        message: 'Database model error: Message model not loaded correctly' 
      });
    }
    
    const message = await Message.findById(req.params.id);
    
    if (message && message.userId.toString() === req.user._id.toString()) {
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    console.error('Error fetching message by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Validate that Message model is properly loaded
    if (!Message || typeof Message.findById !== 'function') {
      console.error('Message model is not properly loaded');
      return res.status(500).json({ 
        message: 'Database model error: Message model not loaded correctly' 
      });
    }
    
    const message = await Message.findById(req.params.id);

    if (message && message.userId.toString() === req.user._id.toString()) {
      const updatedMessage = await Message.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Validate that Message model is properly loaded
    if (!Message || typeof Message.findById !== 'function') {
      console.error('Message model is not properly loaded');
      return res.status(500).json({ 
        message: 'Database model error: Message model not loaded correctly' 
      });
    }
    
    const message = await Message.findById(req.params.id);

    if (message && message.userId.toString() === req.user._id.toString()) {
      await Message.findByIdAndDelete(req.params.id);
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: error.message });
  }
};