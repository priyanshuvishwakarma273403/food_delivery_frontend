import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import './MoodSearch.css';

const MoodSearch = ({ onSuggestionSelect }) => {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/ai/personalized-greeting?name=User&context=${mood}`);
      const text = await response.text();
      
      // Clean up response: If it's HTML, show a fallback, else show the text
      const cleanText = text.includes('<!DOCTYPE html>') 
        ? `Thinking about "${mood}"? How about trying some trending Fusion dishes from our top restaurants? 🍕🥘`
        : text;
        
      setSuggestion(cleanText);
    } catch (error) {
      console.error("AI Error:", error);
      setSuggestion("How about a delicious Pizza to cheer you up? 🍕");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="mood-search-container" hover={false}>
      <form onSubmit={handleMoodSubmit} className="mood-form">
        <label>How are you feeling today?</label>
        <div className="mood-input-wrapper">
          <input 
            type="text" 
            placeholder="e.g. Feeling low, need comfort food..."
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            type="submit"
          >
            {loading ? 'AI thinking...' : 'Suggest 🤖'}
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {suggestion && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="ai-suggestion-bubble"
          >
            <span className="ai-icon">✨</span>
            <p>{suggestion}</p>
            <button className="clear-ai" onClick={() => setSuggestion(null)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

export default MoodSearch;
