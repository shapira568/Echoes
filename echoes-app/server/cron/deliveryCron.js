// cron/deliveryCron.js
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const User = require('../models/User');

// Configure email transporter
let transporter;
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  // Verify transporter configuration
  transporter.verify((error, success) => {
    if (error) {
      console.error('Email transporter configuration error:', error);
    } else {
      console.log('Email transporter is ready');
    }
  });
} catch (error) {
  console.error('Failed to create email transporter:', error);
}

// Check for messages to deliver every hour
const startDeliveryCron = () => {
  // Only start cron if transporter is configured
  if (!transporter) {
    console.log('Email transporter not configured, skipping cron job');
    return;
  }
  
  cron.schedule('0 * * * *', async () => {
    console.log('Checking for messages to deliver...');
    
    try {
      // Find messages that are due for delivery
      const now = new Date();
      const messagesToDeliver = await Message.find({
        deliveryDate: { $lte: now },
        status: 'pending'
      }).populate('userId');
      
      console.log(`Found ${messagesToDeliver.length} messages to deliver`);
      
      for (const message of messagesToDeliver) {
        try {
          // Send email to recipient
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: message.recipient === 'self' ? message.userId.email : message.recipient,
            subject: `A Message from Your Past - Echoes`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #4a90e2;">A Message from Your Past</h2>
                <p>You sent this message on ${new Date(message.createdAt).toLocaleDateString()}:</p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                  <p>${message.content}</p>
                </div>
                <p>This message was sent through <strong>Echoes</strong> - your emotional time capsule.</p>
                <hr>
                <p style="font-size: 12px; color: #666;">
                  This is an automated message. Please do not reply.
                </p>
              </div>
            `
          });
          
          // Update message status
          message.status = 'delivered';
          await message.save();
          
          console.log(`Message ${message._id} delivered to ${message.recipient}`);
        } catch (error) {
          console.error(`Failed to deliver message ${message._id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error in delivery cron job:', error);
    }
  });
  
  console.log('Delivery cron job started - checking every hour');
};

module.exports = { startDeliveryCron };