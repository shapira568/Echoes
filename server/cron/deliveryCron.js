const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const Message = require('../models/Message');
const User = require('../models/User');

let transporter;
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  transporter.verify((error) => {
    if (error) console.error('Email transporter error:', error);
    else console.log('Email transporter is ready');
  });
} catch (error) {
  console.error('Failed to create email transporter:', error);
}

const startDeliveryCron = () => {
  if (!transporter) {
    console.log('Email transporter not configured, skipping cron job');
    return;
  }

  cron.schedule('0 * * * *', async () => {
    try {
      const now = new Date();
      const messagesToDeliver = await Message.findAll({
        where: {
          deliveryDate: { [Op.lte]: now },
          status: 'pending'
        },
        include: [{ model: User, as: 'user' }]
      });

      for (const message of messagesToDeliver) {
        try {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: message.recipient === 'self' ? message.user.email : message.recipient,
            subject: 'A Message from Your Past - Echoes',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4a90e2;">A Message from Your Past</h2>
                <p>You sent this message on ${new Date(message.createdAt).toLocaleDateString()}:</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <p>${message.content}</p>
                </div>
                <p>This message was sent through <strong>Echoes</strong> - your emotional time capsule.</p>
              </div>
            `
          });
          await message.update({ status: 'delivered' });
          console.log(`Message ${message.id} delivered`);
        } catch (error) {
          console.error(`Failed to deliver message ${message.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in delivery cron job:', error);
    }
  });

  console.log('Delivery cron job started');
};

module.exports = { startDeliveryCron };
