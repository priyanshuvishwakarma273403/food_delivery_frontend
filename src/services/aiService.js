import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || 'your_api_key_here',
  dangerouslyAllowBrowser: true,
});

export const getGroqResponse = async (messages) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are "Tomato AI", the ultimate food expert and delivery assistant. You help people find the best food, give recipe tips, and handle their queries in a fun, spicy, and very helping way. Keep your responses concise and food-focused. Mention Tomato Gold for premium suggestions.',
        },
        ...messages
      ],
      model: 'llama-3.3-70b-versatile',
    });
    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error('Groq AI Error:', error);
    return "Oops! My kitchen is currently a bit busy, please try again in a moment! 🍛";
  }
};
