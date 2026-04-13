import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Zap, ChefHat, Utensils } from 'lucide-react';
import { cn } from '../../utils/cn';

import apiClient from '../../api/axios';

const SYSTEM_PROMPT = `You are Tomato AI — a smart, friendly food delivery assistant for the Tomato app (India's #1 food delivery platform). 

Your capabilities:
- Recommend food based on mood, weather, health goals, or cravings
- Suggest restaurants and dishes from our 100+ partner restaurants  
- Help with dietary restrictions (veg, vegan, gluten-free, keto)
- Provide quick meal ideas, combos, and budget-friendly options
- Answer questions about cuisines, ingredients, and cooking tips
- Help track orders and delivery queries

Personality: Warm, enthusiastic about food, uses food emojis occasionally 🍕🍔🍜. Keep responses concise (2-4 sentences max unless asked for detail). Always be helpful and suggest specific dishes/cuisines.

When asked about order issues, remind them to check the "Orders" tab or contact support.`;

const QUICK_PROMPTS = [
  { text: "What should I eat?", icon: "🤔" },
  { text: "Suggest something healthy", icon: "🥗" },
  { text: "I want something spicy", icon: "🌶️" },
  { text: "Budget meal under ₹200", icon: "💰" },
];

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', text: "Hey there! 👋 I'm Tomato AI, your personal food buddy. What are you craving today? 🍅" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const userMessage = text || message;
    if (!userMessage.trim()) return;

    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setMessage('');
    setLoading(true);

    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...chat.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.text
        })),
        { role: 'user', content: userMessage }
      ];

      const { data } = await apiClient.post('/ai/chat', { messages });
      
      const aiReply = data.data || "I couldn't process that. Let me try again!";
      setChat(prev => [...prev, { role: 'assistant', text: aiReply }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChat(prev => [...prev, { 
        role: 'assistant', 
        text: "Oops! I'm having a little trouble connecting right now. 😅 Try again in a moment, or browse our restaurants for some great food! 🍕" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-4 w-[calc(100vw-32px)] max-w-[380px] h-[70vh] max-h-[520px] bg-white dark:bg-card-main rounded-2xl md:rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-4 md:p-5 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 md:h-10 md:w-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-black text-sm">Tomato AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-[10px] opacity-80 font-bold">Powered by Groq AI • Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {chat.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}
                >
                  <div className={cn(
                    "max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed font-medium",
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-br-md" 
                      : "bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-gray-300 rounded-bl-md"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-5 py-4 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts - only show when chat is minimal */}
            {chat.length <= 2 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt.text)}
                    className="px-3 py-1.5 bg-primary/5 border border-primary/10 rounded-full text-[11px] font-bold text-primary hover:bg-primary/10 transition-colors flex items-center gap-1"
                  >
                    <span>{prompt.icon}</span> {prompt.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800 flex gap-2 shrink-0 bg-white dark:bg-card-main">
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Ask me anything about food..."
                className="flex-1 bg-gray-50 dark:bg-gray-900 border-none outline-none px-4 py-3 rounded-xl text-sm font-medium dark:text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
              />
              <button 
                onClick={() => sendMessage()}
                disabled={loading || !message.trim()}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  message.trim() && !loading
                    ? "bg-primary text-white hover:scale-105 shadow-lg shadow-primary/20"
                    : "bg-gray-100 text-gray-400"
                )}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 md:h-16 md:w-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center relative cursor-pointer"
      >
        {isOpen ? <X size={26} /> : (
          <>
            <MessageSquare size={26} />
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center text-[9px] font-black text-black ring-2 ring-white dark:ring-card-main">
              AI
            </div>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default AiAssistant;
