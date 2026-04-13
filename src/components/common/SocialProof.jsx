import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';

const NAMES = ['Rahul', 'Anjali', 'Amit', 'Priya', 'Siddharth', 'Nehal', 'Vikram', 'Sneha'];
const CITIES = ['Delhi', 'Noida', 'Gurgaon', 'Mumbai', 'Bangalore', 'Pune'];
const ITEMS = ['Butter Chicken', 'Cheese Pizza', 'Veg Biryani', 'Hakka Noodles', 'Spring Rolls'];

const SocialProof = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const showNotification = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      
      setNotification({ name, city, item });

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.6) showNotification();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-24 left-8 z-[90] pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className="bg-white dark:bg-card-main p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-4"
          >
            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-text-primary dark:text-white">
                <span className="text-primary">{notification.name}</span> from {notification.city}
              </p>
              <p className="text-[10px] text-text-secondary">Just ordered {notification.item}</p>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-0.5 rounded-full">
               <Star size={10} fill="currentColor" /> Live
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SocialProof;
