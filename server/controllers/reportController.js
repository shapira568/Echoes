const Report = require('../models/Report');

exports.createReport = async (req, res) => {
  try {
    const { summary, date } = req.body;
    const report = await Report.create({
      userId: req.user.id,
      summary,
      date: date || new Date()
    });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']]
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
