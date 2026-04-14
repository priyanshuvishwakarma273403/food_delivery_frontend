import React from 'react';
import { motion } from 'framer-motion';
import { useWalletStore } from '../../store/walletStore';
import GlassCard from '../common/GlassCard';
import './CoinRedeemer.css';

const CoinRedeemer = ({ cartTotal }) => {
  const { coins, isApplyingCoins, toggleApplyingCoins } = useWalletStore();

  const discountAmount = Math.min(coins, cartTotal);

  if (coins <= 0) return null;

  return (
    <GlassCard className="coin-redeemer-card" hover={false}>
      <div className="redeemer-content">
        <div className="redeemer-info">
          <div className="redeemer-title">
            <span className="coin-icon">🪙</span>
            <h4>Tomato Coins Balance</h4>
          </div>
          <p className="balance-text">You have <strong>{coins}</strong> coins available</p>
        </div>

        <div className="redeemer-action">
          <div className="discount-preview">
            {isApplyingCoins ? (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="discount-tag"
              >
                -₹{discountAmount} OFF
              </motion.span>
            ) : (
              <span className="save-text">Save up to ₹{discountAmount}</span>
            )}
          </div>

          <label className="switch">
            <input 
              type="checkbox" 
              checked={isApplyingCoins} 
              onChange={toggleApplyingCoins}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      
      {isApplyingCoins && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="applied-status"
        >
          🎉 Your coins are applied! Enjoy the discount.
        </motion.div>
      )}
    </GlassCard>
  );
};

export default CoinRedeemer;
