// services/aiService.js
const OpenAI = require('openai');

const isAiEnhancementAvailable = () => Boolean(process.env.OPENAI_API_KEY);

const getOpenAIClient = () => {
  if (!isAiEnhancementAvailable()) {
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const enhanceMessage = async (messageContent, userHistory = []) => {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      throw new Error('AI enhancement is not configured');
    }

    // Create a concise context from user's recent message history
    const context = userHistory
      .slice(-5)
      .map(msg => `• "${msg.content}" (${new Date(msg.createdAt).toLocaleDateString()})`)
      .join('\n');

    const prompt = `You are an AI assistant helping users write meaningful, emotionally resonant messages to their future self or loved ones.

ORIGINAL MESSAGE:
"${messageContent}"

${context ? `USER'S RECENT MESSAGE HISTORY:\n${context}\n\n` : ''}

ENHANCEMENT GUIDELINES:
1. Preserve the user's exact intent, tone, and personal voice
2. Make it more poetic, reflective, and emotionally deep
3. Frame it as a timeless gift from the past to the future
4. Keep it concise, personal, and authentic
5. Do NOT add greetings, signatures, or meta-commentary

RETURN ONLY the enhanced message text. No quotes, no markdown, no explanations.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // ✅ More reliable, faster, and cost-effective than gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.75,
      presence_penalty: 0.3,
      frequency_penalty: 0.3
    });

    let enhanced = completion.choices[0].message.content.trim();
    
    // ✅ Strip markdown code blocks if OpenAI adds them accidentally
    enhanced = enhanced.replace(/```[\s\S]*?```/g, '').trim();
    // ✅ Remove leading/trailing quotes that sometimes appear
    enhanced = enhanced.replace(/^["']|["']$/g, '').trim();
    
    return enhanced || messageContent; // Fallback to original if empty
    
  } catch (error) {
    console.error('❌ AI Enhancement Error:', error.message);
    // ✅ Safe fallback: return original message if AI fails
    return messageContent;
  }
};

module.exports = { enhanceMessage, isAiEnhancementAvailable };
