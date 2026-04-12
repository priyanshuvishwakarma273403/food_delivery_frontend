import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import apiClient from '../../api/axios';
import { cn } from '../../utils/cn';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'bot', text: 'Hi! I am Tomato AI. How can I help you eat better today? 🍅' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChat(prev => [...prev, { role: 'user', text: userMessage }]);
    setMessage('');
    setLoading(true);

    try {
      const response = await apiClient.get(`/ai/chat?message=${encodeURIComponent(userMessage)}`);
      setChat(prev => [...prev, { role: 'bot', text: response.data.data }]);
    } catch (error) {
       setChat(prev => [...prev, { role: 'bot', text: 'Sorry, I am having a bit of a brain freeze. Try again?' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-[350px] h-[500px] bg-white dark:bg-card-main rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-sm">Tomato Assistant</h3>
                  <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">Powered by Groq AI</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {chat.map((msg, i) => (
                <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[80%] p-4 rounded-2xl text-sm font-medium",
                    msg.role === 'user' ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-gray-300"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                   <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl">
                      <div className="flex gap-1">
                         <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce" />
                         <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                         <div className="h-1.5 w-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                      </div>
                   </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-50 dark:bg-gray-900 border-none outline-none px-4 py-3 rounded-xl text-sm dark:text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-primary text-white p-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
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
        className="h-16 w-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/30 flex items-center justify-center relative cursor-pointer"
      >
        {isOpen ? <X size={28} /> : (
          <>
            <MessageSquare size={28} />
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-black text-black ring-4 ring-white dark:ring-card-main">
              AI
            </div>
          </>
        )}
      </motion.button>
    </div>
  );
};

export default AiAssistant;
