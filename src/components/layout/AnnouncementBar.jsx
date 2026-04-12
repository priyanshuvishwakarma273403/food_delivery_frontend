import { motion } from 'framer-motion';

const AnnouncementBar = () => {
  const announcements = [
    "🔥 50% OFF up to ₹100 on your first order. Use code: FIRST50",
    "🚚 Free Delivery on all orders above ₹499!",
    "🍕 New in Town: Pizza Express is now open with 20% OFF!",
    "🍅 Tomato Gold members get extra 10% discount on every order.",
    "🌧️ Rainy Day Special: Hot Pakodas & Chai delivered in 20 mins!"
  ];

  return (
    <div className="bg-primary overflow-hidden py-1.5 border-b border-primary-dark select-none relative z-[60]">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
        className="flex whitespace-nowrap gap-20 items-center"
      >
        {[...announcements, ...announcements].map((text, i) => (
          <div key={i} className="flex items-center gap-4">
             <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-4">
               {text}
               <div className="h-1.5 w-1.5 bg-yellow-400 rounded-full" />
             </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;
