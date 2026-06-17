const twilio = require('twilio');

const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendWhatsAppMessage = async (recipientPhone, content, createdAt) => {
  try {
    // Ensure phone starts with country code (e.g., +1234567890)
    const formattedTo = recipientPhone.startsWith('+') 
      ? `whatsapp:${recipientPhone}` 
      : `whatsapp:+${recipientPhone}`;

    const result = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: formattedTo,
      body: `📜 *A Message from Your Past - Echoes*\n\nYou sent this on ${new Date(createdAt).toLocaleDateString()}:\n\n"${content}"\n\nThis message was sent through Echoes - your emotional time capsule.`
    });

    console.log(`✅ WhatsApp sent to ${recipientPhone} | SID: ${result.sid}`);
    return true;
  } catch (error) {
    console.error(`❌ WhatsApp failed for ${recipientPhone}:`, error.message);
    return false;
  }
};