// services/aiService.js
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const enhanceMessage = async (messageContent, userHistory = []) => {
  try {
    // Create a context from user's message history
    const context = userHistory.slice(-5).map(msg => 
      `Previous message: "${msg.content}" (Sent: ${new Date(msg.createdAt).toLocaleDateString()})`
    ).join('\n');

    const prompt = `
      You are an AI assistant helping a user create meaningful messages for their future self or loved ones.
      The user has written the following message:
      
      "${messageContent}"
      
      ${context ? `Previous messages from this user:\n${context}\n\n` : ''}
      
      Please enhance this message by:
      1. Making it more poetic and emotionally resonant
      2. Preserving the user's original voice and intent
      3. Adding depth and meaning while keeping it personal
      4. Making it feel like a gift from the past to the future
      
      Return only the enhanced message, nothing else:
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
      temperature: 0.7
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI Enhancement Error:', error);
    // Return original message if AI enhancement fails
    return messageContent;
  }
};

module.exports = { enhanceMessage };