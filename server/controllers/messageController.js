const Message = require('../models/Message');
const { enhanceMessage } = require('../services/aiService');

exports.createMessage = async (req, res) => {
  try {
    const {
      content, messageType, deliveryMethod, deliveryDate,
      lifeEvent, emotionalState, recipient, aiEnhance = false
    } = req.body;

    if (!content) return res.status(400).json({ message: 'Content is required' });
    if (!recipient) return res.status(400).json({ message: 'Recipient is required' });

    let enhancedContent = content;
    if (aiEnhance) {
      try {
        const userMessages = await Message.findAll({
          where: { userId: req.user.id },
          order: [['createdAt', 'DESC']],
          limit: 5
        });
        enhancedContent = await enhanceMessage(content, userMessages);
      } catch (aiError) {
        console.error('AI enhancement error:', aiError);
      }
    }

    const message = await Message.create({
      userId: req.user.id,
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
    res.status(500).json({ message: error.message });
  }
};

exports.getUserMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { userId: req.user.id } });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (message && message.userId === req.user.id) {
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (message && message.userId === req.user.id) {
      await message.update(req.body);
      res.json(message);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (message && message.userId === req.user.id) {
      await message.destroy();
      res.json({ message: 'Message removed' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
