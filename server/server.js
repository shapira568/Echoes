const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/db');
const { startDeliveryCron } = require('./cron/deliveryCron');

// Import models to register them with Sequelize
const User = require('./models/User');
const Message = require('./models/Message');
const Subscription = require('./models/Subscription');

// Define associations
User.hasMany(Message, { foreignKey: 'userId', as: 'messages' });
Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Subscription, { foreignKey: 'userId', as: 'subscription' });
Subscription.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Echoes API is running' });
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api/upload', uploadRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// Sync database and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ PostgreSQL connected and tables synced');
    startDeliveryCron();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ PostgreSQL connection failed:', err.message));

module.exports = app;
