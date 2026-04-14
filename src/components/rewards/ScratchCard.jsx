import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWalletStore } from '../../store/walletStore';
import './ScratchCard.css';

const ScratchCard = ({ cardId, rewardAmount, onComplete }) => {
  const [isScratched, setIsScratched] = useState(false);
  const canvasRef = useRef(null);
  const { scratchCard } = useWalletStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Initial silver cover
    ctx.fillStyle = '#C0C0C0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some texture to silver
    ctx.fillStyle = '#A0A0A0';
    for(let i=0; i<100; i++) {
        ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 2, 2);
    }

    const scratch = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || e.touches[0].clientX) - rect.left;
      const y = (e.clientY || e.touches[0].clientY) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      checkScratched();
    };

    const checkScratched = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearPixels = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) clearPixels++;
      }

      const percentage = (clearPixels / (pixels.length / 4)) * 100;
      if (percentage > 50 && !isScratched) {
        setIsScratched(true);
        scratchCard(cardId);
        if (onComplete) onComplete();
      }
    };

    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchmove', scratch);

    return () => {
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('touchmove', scratch);
    };
  }, [cardId, isScratched, scratchCard, onComplete]);

  return (
    <div className="scratch-card-container">
      <div className="reward-content">
        <span className="reward-icon">🪙</span>
        <h3>You Won!</h3>
        <p className="reward-amount">{rewardAmount} Coins</p>
      </div>
      {!isScratched && (
        <canvas 
          ref={canvasRef} 
          width={280} 
          height={160} 
          className="scratch-canvas"
        />
      )}
      {isScratched && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="scratch-overlay-win"
        >
          ✨ ADDED TO WALLET ✨
        </motion.div>
      )}
    </div>
  );
};

export default ScratchCard;
