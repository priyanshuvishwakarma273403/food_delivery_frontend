import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Zap } from 'lucide-react';

const RANDOM_NAMES = ['Ankit', 'Ashu', 'Faiz', 'Rahul', 'Priya', 'Sanya', 'Vikram', 'Rohan', 'Megha', 'Sneha'];
const RANDOM_ITEMS = ['Chicken Biryani', 'Margherita Pizza', 'Double Cheese Burger', 'Butter Chicken', 'Masala Dosa', 'Paneer Tikka', 'Chole Bhature'];
const RANDOM_LOCATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Noida', 'Gurgaon', 'Pune', 'Hyderabad', 'Kolkata'];

const OrderPulse = () => {
  const [pulse, setPulse] = useState(null);

  useEffect(() => {
    const showPulse = () => {
      const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
      const item = RANDOM_ITEMS[Math.floor(Math.random() * RANDOM_ITEMS.length)];
      const location = RANDOM_LOCATIONS[Math.floor(Math.random() * RANDOM_LOCATIONS.length)];
      
      setPulse({ name, item, location });
      
      // Hide after 4 seconds
      setTimeout(() => setPulse(null), 4000);
    };

    // Show first one after 5s, then every 12s
    const timer = setTimeout(() => {
      showPulse();
      const interval = setInterval(showPulse, 12000);
      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-24 left-6 z-[60] pointer-events-none">
      <AnimatePresence>
        {pulse && (
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.8 }}
            className="bg-white/90 backdrop-blur-xl border border-white/20 p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-4 max-w-[280px]"
          >
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0 relative">
               <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
               <ShoppingBag size={18} />
            </div>
            
            <div>
               <p className="text-[10px] font-black text-[#1C1C1C] leading-tight">
                 <span className="text-primary">{pulse.name}</span> in {pulse.location} just ordered
               </p>
               <div className="flex items-center gap-1 mt-0.5">
                  <Zap size={10} className="text-orange-500 fill-orange-500" />
                  <p className="text-xs font-black text-[#1C1C1C] truncate">{pulse.item}</p>
               </div>
            </div>
            
            {/* Live Indicator */}
            <div className="flex flex-col items-center gap-1 ml-1 border-l border-gray-100 pl-3">
               <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[8px] font-black text-green-500 uppercase">Live</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderPulse;
