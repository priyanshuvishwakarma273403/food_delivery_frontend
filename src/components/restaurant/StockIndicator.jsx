import React from 'react';
import { motion } from 'framer-motion';
import './StockIndicator.css';

const StockIndicator = ({ stockQuantity }) => {
  if (stockQuantity === null || stockQuantity === undefined || stockQuantity > 10) {
    return null;
  }

  return (
    <motion.div 
      className={`stock-indicator ${stockQuantity <= 3 ? 'low-stock' : 'med-stock'}`}
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <span className="dot"></span>
      {stockQuantity === 0 ? (
        <span className="stock-text">Out of Stock</span>
      ) : (
        <span className="stock-text">Only {stockQuantity} left</span>
      )}
    </motion.div>
  );
};

export default StockIndicator;
