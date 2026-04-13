import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, ChefHat, User, Minimize2 } from 'lucide-react';
import { getGroqResponse } from '../services/aiService';
import Button from './common/Button';
import { cn } from '../utils/cn';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey there! I am Tomato AI. 🍅 Hungry for something special tonight?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const gptMessages = messages.map(({ role, content }) => ({ role, content }));
      gptMessages.push(userMessage);

      const aiResponseContent = await getGroqResponse(gptMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponseContent }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="w-[90vw] sm:w-[400px] h-[580px] bg-white dark:bg-card-main shadow-2xl rounded-[2.5rem] flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800 mb-4"
          >
            {/* Header */}
            <div className="bg-primary p-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                   <ChefHat size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight">Tomato AI</h3>
                  <div className="flex items-center gap-1.5 opacity-80 text-[10px] uppercase font-bold tracking-widest">
                    <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online & Helpful
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                title="Hide chat"
              >
                <Minimize2 size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gray-50/30 dark:bg-transparent">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col max-w-[85%] gap-1",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm font-medium shadow-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white dark:bg-gray-800 text-text-primary dark:text-gray-100 rounded-tl-none border border-gray-100 dark:border-gray-700"
                  )}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {msg.role === 'user' ? 'You' : 'Assistant'}
                  </span>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-primary">
                  <div className="flex gap-1 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-card-main border-t border-gray-100 dark:border-gray-800">
              <div className="relative group">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for food recommendations..."
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-2xl pl-5 pr-14 py-4 text-sm outline-none transition-all dark:text-white"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary p-2.5 rounded-xl text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white relative group",
          isOpen ? "bg-white text-primary border border-gray-100" : "bg-primary"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
             <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
               <X size={28} />
             </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
               <MessageCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Helper Badge */}
        {!isOpen && (
           <div className="absolute -top-1 -right-1 bg-yellow-400 p-1.5 rounded-full border-4 border-white dark:border-card-main animate-bounce">
              <Sparkles size={12} className="text-white" />
           </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatbot;
