const Journal = require('../models/Journal');

exports.createJournal = async (req, res) => {
  try {
    const { title, content, mood, tags, isPrivate } = req.body;
    const journal = await Journal.create({
      userId: req.user.id,
      title,
      content,
      mood,
      tags: tags || [],
      isPrivate: isPrivate !== undefined ? isPrivate : true
    });
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJournals = async (req, res) => {
  try {
    const journals = await Journal.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']]
    });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};