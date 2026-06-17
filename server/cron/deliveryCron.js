const cron = require('node-cron');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const Message = require('../models/Message');
const User = require('../models/User');

const EMAIL_ATTACHMENT_LIMIT_BYTES = 20 * 1024 * 1024;

const getMediaInfo = (message) => {
  if (!message.mediaUrl) {
    return { link: '', attachments: [], note: '' };
  }

  const publicBaseUrl = process.env.SERVER_PUBLIC_URL || process.env.API_PUBLIC_URL || '';
  const mediaUrl = message.mediaUrl;
  const parsedMediaUrl = mediaUrl.startsWith('http') ? new URL(mediaUrl) : null;
  const relativeMediaUrl = parsedMediaUrl ? parsedMediaUrl.pathname : mediaUrl;
  const mediaPath = path.join(__dirname, '..', relativeMediaUrl.replace(/^\/+/, ''));
  const isLocalhostUrl = parsedMediaUrl && ['localhost', '127.0.0.1', '::1'].includes(parsedMediaUrl.hostname);
  const link = publicBaseUrl
    ? `${publicBaseUrl.replace(/\/$/, '')}${relativeMediaUrl.startsWith('/') ? relativeMediaUrl : `/${relativeMediaUrl}`}`
    : parsedMediaUrl && !isLocalhostUrl
      ? mediaUrl
      : '';

  if (!fs.existsSync(mediaPath)) {
    return {
      link,
      attachments: [],
      note: link ? 'Your media file is available from the link below.' : 'A media file was included, but it is not available on this server.'
    };
  }

  const stats = fs.statSync(mediaPath);
  const filename = path.basename(mediaPath);

  if (stats.size > EMAIL_ATTACHMENT_LIMIT_BYTES) {
    return {
      link,
      attachments: [],
      note: 'Your media file is too large to attach to email, so it is included as a link below.'
    };
  }

  return {
    link,
    attachments: [{ filename, path: mediaPath }],
    note: 'Your media file is attached to this email.'
  };
};

const renderMediaBlock = (mediaInfo) => {
  if (!mediaInfo.note && !mediaInfo.link) return '';

  return `
    <div style="background: #eef6ff; padding: 16px; border-radius: 10px; margin: 20px 0;">
      <p style="margin: 0 0 8px 0;"><strong>Media:</strong> ${mediaInfo.note}</p>
      ${mediaInfo.link ? `<p style="margin: 0;"><a href="${mediaInfo.link}">Open media file</a></p>` : ''}
    </div>
  `;
};

const appendMediaText = (body, mediaInfo) => {
  if (!mediaInfo.link) return body;
  return `${body}\n\nMedia: ${mediaInfo.link}`;
};

const addTwilioMedia = (payload, mediaInfo) => {
  if (mediaInfo.link) {
    return { ...payload, mediaUrl: [mediaInfo.link] };
  }
  return payload;
};

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

let twilioClient;
try {
  twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  console.log('Twilio client initialized for WhatsApp and SMS');
} catch (error) {
  console.error('Failed to initialize Twilio client:', error);
}

const startDeliveryCron = () => {
  if (!transporter && !twilioClient) {
    console.log('No delivery methods configured, skipping cron job');
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
          let deliverySuccess = false;
          const channel = message.deliveryChannel || 'email';
          const mediaInfo = getMediaInfo(message);
          const rawRecipient = message.recipient === 'self' ? message.user.email : message.recipient;

          if (channel === 'whatsapp' && twilioClient) {
            const phone = rawRecipient.startsWith('+') ? rawRecipient : `+${rawRecipient}`;
            const whatsappBody = `A Message from Your Past - Echoes\n\nYou sent this on ${new Date(message.createdAt).toLocaleDateString()}:\n\n"${message.content}"\n\nThis message was sent through Echoes.`;

            await twilioClient.messages.create(addTwilioMedia({
              from: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
              to: `whatsapp:${phone}`,
              body: appendMediaText(whatsappBody, mediaInfo)
            }, mediaInfo));

            deliverySuccess = true;
            console.log(`Message ${message.id} delivered via WhatsApp to ${phone}`);
          } else if (channel === 'sms' && twilioClient) {
            const phone = rawRecipient.startsWith('+') ? rawRecipient : `+${rawRecipient}`;
            const smsBody = `A Message from Your Past - Echoes\n\nYou sent this on ${new Date(message.createdAt).toLocaleDateString()}:\n\n"${message.content}"\n\nThis message was sent through Echoes.`;

            await twilioClient.messages.create(addTwilioMedia({
              from: process.env.TWILIO_SMS_FROM,
              to: phone,
              body: appendMediaText(smsBody, mediaInfo)
            }, mediaInfo));

            deliverySuccess = true;
            console.log(`Message ${message.id} delivered via SMS to ${phone}`);
          } else if (transporter) {
            await transporter.sendMail({
              from: process.env.EMAIL_USER,
              to: rawRecipient,
              subject: 'A Message from Your Past - Echoes',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #4a90e2;">A Message from Your Past</h2>
                  <p>You sent this message on ${new Date(message.createdAt).toLocaleDateString()}:</p>
                  <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                    <p>${message.content}</p>
                  </div>
                  ${renderMediaBlock(mediaInfo)}
                  <p>This message was sent through <strong>Echoes</strong> - your emotional time capsule.</p>
                </div>
              `,
              attachments: mediaInfo.attachments
            });

            deliverySuccess = true;
            console.log(`Message ${message.id} delivered via Email to ${rawRecipient}`);
          }

          if (deliverySuccess) {
            await message.update({ status: 'delivered' });
          }
        } catch (error) {
          console.error(`Failed to deliver message ${message.id}:`, error.message);
        }
      }
    } catch (error) {
      console.error('Error in delivery cron job:', error.message);
    }
  });

  console.log('Delivery cron job started');
};

module.exports = { startDeliveryCron };
