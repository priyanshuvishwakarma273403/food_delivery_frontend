import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CoinRewardPopup = ({ show, coins, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-24 right-8 z-[100] bg-white border-2 border-yellow-400 rounded-3xl p-4 shadow-2xl flex items-center gap-3 overflow-hidden"
        >
          {/* Animated Background Rays */}
          <div className="absolute inset-0 bg-yellow-50/50 -z-10 animate-pulse" />
          
          <div className="h-12 w-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
            🪙
          </div>
          
          <div>
            <p className="text-yellow-700 font-black text-sm uppercase tracking-wider">Earn Rewards!</p>
            <p className="text-text-primary font-black text-lg">
              Earn <span className="text-yellow-500">+{coins}</span> Coins on this!
            </p>
          </div>

          <button 
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-text-primary"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoinRewardPopup;
