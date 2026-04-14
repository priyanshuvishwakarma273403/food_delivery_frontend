import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWalletStore } from '../../store/walletStore';
import { useAuthStore } from '../../store/authStore';
import './WalletBadge.css';

const WalletBadge = () => {
  const { coins, fetchCoins } = useWalletStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      fetchCoins(user.id);
    }
  }, [user, fetchCoins]);

  return (
    <motion.div 
      className="wallet-badge"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="coin-icon">🪙</div>
      <AnimatePresence mode="wait">
        <motion.span 
          key={coins}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="coin-count"
        >
          {coins}
        </motion.span>
      </AnimatePresence>
      <span className="coin-label">Coins</span>
    </motion.div>
  );
};

export default WalletBadge;
