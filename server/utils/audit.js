const AuditLog = require('../models/AuditLog');

exports.recordAudit = async (req, action, userId = null) => {
  try {
    await AuditLog.create({
      userId: userId || req.user?.id || null,
      action,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });
  } catch (error) {
    console.error('Audit log failed:', error.message);
  }
};
