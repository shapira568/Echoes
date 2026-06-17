const User = require('../models/User');
const Message = require('../models/Message');
const Subscription = require('../models/Subscription');
const LegacyContact = require('../models/LegacyContact');
const AuditLog = require('../models/AuditLog');

exports.getAdminOverview = async (req, res) => {
  try {
    const [totalUsers, totalMessages, pendingMessages, deliveredMessages, legacyContacts, subscriptions, logs] = await Promise.all([
      User.count(),
      Message.count(),
      Message.count({ where: { status: 'pending' } }),
      Message.count({ where: { status: 'delivered' } }),
      LegacyContact.count(),
      Subscription.count(),
      AuditLog.findAll({ order: [['createdAt', 'DESC']], limit: 12 })
    ]);

    res.json({
      totalUsers,
      totalMessages,
      pendingMessages,
      deliveredMessages,
      legacyContacts,
      subscriptions,
      logs
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: 100
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
