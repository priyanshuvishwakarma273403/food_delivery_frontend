import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Sparkles, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

const ScratchCard = ({ card, onScratchComplete }) => {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(card.isScratched);
  const isDrawing = useRef(false);

  useEffect(() => {
    if (isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Fill with modern gradient cover
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#FF4B2B');
    gradient.addColorStop(1, '#FF416C');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text overlay
    ctx.font = '20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Scratch Here', canvas.width / 2, canvas.height / 2 + 5);

    // Add pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for(let i=0; i<100; i+=20) {
       for(let j=0; j<100; j+=20) {
          ctx.beginPath();
          ctx.arc(i*3, j*3, 2, 0, Math.PI*2);
          ctx.fill();
       }
    }

    ctx.globalCompositeOperation = 'destination-out';

    const getMousePos = (evt) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      let clientX, clientY;

      if (evt.touches && evt.touches.length > 0) {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
      } else {
        clientX = evt.clientX;
        clientY = evt.clientY;
      }

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const scratch = (e) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      
      const pos = getMousePos(e);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2, false);
      ctx.fill();

      checkScratched();
    };

    const checkScratched = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) transparentPixels++;
      }

      // If more than 50% is scratched
      const percent = (transparentPixels / (data.length / 4)) * 100;
      if (percent > 50) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsScratched(true);
        onScratchComplete(card.id);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    };

    const startDrawing = (e) => { isDrawing.current = true; scratch(e); };
    const stopDrawing = () => { isDrawing.current = false; };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isScratched, card.id, onScratchComplete]);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-64 h-64 bg-yellow-50 rounded-[2rem] border-4 border-yellow-200 overflow-hidden shadow-2xl flex items-center justify-center p-6 text-center select-none"
    >
      {/* Underlying Reward Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-4">
        <PartyPopper size={40} className="text-orange-500 mb-3 animate-bounce" />
        <p className="text-xl font-black text-text-primary mb-1">You Won!</p>
        <div className="flex items-center gap-2 text-primary">
           <Coins size={28} />
           <span className="text-4xl font-black">{card.amount}</span>
        </div>
        <p className="text-xs font-bold text-yellow-600 uppercase tracking-widest mt-2">Tomato Coins</p>
      </div>

      {/* Scratch Overlay Canvas */}
      {!isScratched && (
        <canvas
          ref={canvasRef}
          width={256}
          height={256}
          className="absolute inset-0 cursor-crosshair touch-none z-10"
        />
      )}
    </motion.div>
  );
};

export default ScratchCard;
