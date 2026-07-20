const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');
const { startDeliveryCron } = require('./cron/deliveryCron');

// ==================== ✅ EXISTING MODEL IMPORTS ====================
const User = require('./models/User');
const Message = require('./models/Message');
const Subscription = require('./models/Subscription');
const LegacyContact = require('./models/LegacyContact');
const AuditLog = require('./models/AuditLog');

// 🔽🔽🔽 NEW: Mental Health Model Imports 🔽🔽🔽
const MoodEntry = require('./models/MoodEntry');
const Symptom = require('./models/Symptom');
const Journal = require('./models/Journal');
const Trigger = require('./models/Trigger');
const Medication = require('./models/Medication');
const Goal = require('./models/Goal');
const Report = require('./models/Report');
const EmergencyContact = require('./models/EmergencyContact');
const Therapist = require('./models/Therapist');
const Session = require('./models/Session');
const Reminder = require('./models/Reminder');
// 🔼🔼🔼 END NEW MODEL IMPORTS 🔼🔼🔼

// ==================== ✅ EXISTING ASSOCIATIONS ====================
User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Subscription, { foreignKey: 'userId', as: 'subscription' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(LegacyContact, { foreignKey: 'userId', as: 'legacyContacts' });
LegacyContact.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(AuditLog, { foreignKey: 'userId', as: 'auditLogs' });
AuditLog.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// 🔽🔽🔽 NEW: Mental Health Associations 🔽🔽🔽
User.hasMany(MoodEntry, { foreignKey: 'userId', as: 'moodEntries' });
MoodEntry.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Symptom, { foreignKey: 'userId', as: 'symptoms' });
Symptom.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Journal, { foreignKey: 'userId', as: 'journals' });
Journal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Trigger, { foreignKey: 'userId', as: 'triggers' });
Trigger.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Medication, { foreignKey: 'userId', as: 'medications' });
Medication.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Goal, { foreignKey: 'userId', as: 'goals' });
Goal.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Report, { foreignKey: 'userId', as: 'reports' });
Report.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(EmergencyContact, { foreignKey: 'userId', as: 'emergencyContacts' });
EmergencyContact.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' });
Session.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Therapist.hasMany(Session, { foreignKey: 'therapistId', as: 'sessions' });
Session.belongsTo(Therapist, { foreignKey: 'therapistId', as: 'therapist' });

User.hasMany(Reminder, { foreignKey: 'userId', as: 'reminders' });
Reminder.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Medication.hasMany(Reminder, { foreignKey: 'medicationId', as: 'remindersList' });
Reminder.belongsTo(Medication, { foreignKey: 'medicationId', as: 'medication' });
// 🔼🔼🔼 END NEW ASSOCIATIONS 🔼🔼🔼

// ==================== ✅ EXPRESS APP SETUP ====================
const app = express();
const PORT = process.env.PORT || 5000;
let dbReady = false;
let databaseRetryTimer;
const databaseRetryMs = Number(process.env.DB_CONNECT_RETRY_MS || 30000);

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Echoes API is running', database: dbReady ? 'ready' : 'starting' });
});

app.get('/api/health', (req, res) => {
  res.status(dbReady ? 200 : 503).json({
    ok: dbReady,
    database: dbReady ? 'ready' : 'unavailable'
  });
});

const requireDatabase = (req, res, next) => {
  if (dbReady) {
    return next();
  }

  return res.status(503).json({
    message: 'The database is temporarily unavailable. Please try again shortly.'
  });
};

app.use('/api', requireDatabase);

// ==================== ✅ EXISTING ROUTES ====================
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

const legacyContactRoutes = require('./routes/legacyContactRoutes');
app.use('/api/legacy-contacts', legacyContactRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

// 🔽🔽🔽 NEW: Mental Health Routes 🔽🔽🔽
const moodRoutes = require('./routes/moodRoutes');
app.use('/api/mood', moodRoutes);

const journalRoutes = require('./routes/journalRoutes');
app.use('/api/journals', journalRoutes);

const symptomRoutes = require('./routes/symptomRoutes');
app.use('/api/symptoms', symptomRoutes);

const triggerRoutes = require('./routes/triggerRoutes');
app.use('/api/triggers', triggerRoutes);

const medicationRoutes = require('./routes/medicationRoutes');
app.use('/api/medications', medicationRoutes);

const goalRoutes = require('./routes/goalRoutes');
app.use('/api/goals', goalRoutes);

const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);

const emergencyContactRoutes = require('./routes/emergencyContactRoutes');
app.use('/api/emergency-contacts', emergencyContactRoutes);

const therapistRoutes = require('./routes/therapistRoutes');
app.use('/api/therapists', therapistRoutes);

const sessionRoutes = require('./routes/sessionRoutes');
app.use('/api/sessions', sessionRoutes);

const reminderRoutes = require('./routes/reminderRoutes');
app.use('/api/reminders', reminderRoutes);
// 🔼🔼🔼 END NEW ROUTES 🔼🔼🔼

// ==================== ✅ START SERVER ====================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🧠 Mental Health features enabled`);
});

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: process.env.DB_SYNC_ALTER === 'true' });
    dbReady = true;
    console.log('✅ PostgreSQL connected and tables synced');
    startDeliveryCron();
  } catch (err) {
    dbReady = false;
    clearTimeout(databaseRetryTimer);
    databaseRetryTimer = setTimeout(syncDatabase, databaseRetryMs);
    console.error('❌ PostgreSQL connection failed:', err.message);
  }
};

syncDatabase();

module.exports = app;
