import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Gift, CreditCard, Sparkles } from 'lucide-react';

const OFFERS = [
  {
    id: 1,
    title: 'Up to 60% OFF',
    subtitle: 'On your first 3 orders today',
    code: 'WELCOME60',
    color: 'from-[#FF512F] to-[#DD2476]',
    icon: <Zap size={40} className="text-white/20" />,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80'
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'On all orders above ₹199',
    code: 'FREEDEL',
    color: 'from-[#00b09b] to-[#96c93d]',
    icon: <Gift size={40} className="text-white/20" />,
    image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?w=800&q=80'
  },
  {
    id: 3,
    title: 'Flat ₹150 OFF',
    subtitle: 'Using HDFC Bank Credit Cards',
    code: 'HDFC150',
    color: 'from-[#4facfe] to-[#00f2fe]',
    icon: <CreditCard size={40} className="text-white/20" />,
    image: 'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=800&q=80'
  }
];

const OfferSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length);

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6 relative group">
        <div className="relative h-56 md:h-80 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className={`absolute inset-0 bg-gradient-to-br ${OFFERS[currentIndex].color} flex items-center p-10 md:p-20`}
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-full h-full opacity-30 mix-blend-overlay">
                 <img src={OFFERS[currentIndex].image} alt="bg" className="w-full h-full object-cover scale-110" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 w-full md:w-3/5">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="bg-white/20 backdrop-blur-xl text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-white/20 shadow-lg">
                      <Sparkles size={12} className="inline mr-1 mb-0.5" /> Special Offer
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight tracking-tighter drop-shadow-2xl">
                    {OFFERS[currentIndex].title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-xl font-bold mb-10 max-w-md leading-relaxed">
                    {OFFERS[currentIndex].subtitle}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-white p-1 rounded-2xl shadow-2xl flex items-center"
                    >
                      <div className="bg-gray-50 text-[10px] font-black text-gray-400 px-3 py-3 rounded-xl uppercase tracking-widest border-r border-gray-100">
                        Code
                      </div>
                      <div className="px-6 py-3 text-primary font-black text-lg tracking-widest">
                        {OFFERS[currentIndex].code}
                      </div>
                    </motion.div>
                    
                    <button className="text-white/80 hover:text-white font-black text-sm uppercase tracking-widest underline decoration-2 underline-offset-8 decoration-white/30 hover:decoration-white transition-all">
                      T&C Apply
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Massive Decorative Icon */}
              <div className="absolute top-1/2 -translate-y-1/2 right-20 opacity-10 hidden lg:block scale-[3]">
                {OFFERS[currentIndex].icon}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows - Premium Glass Style */}
        <button 
          onClick={prevSlide}
          className="absolute left-10 top-1/2 -translate-y-1/2 h-14 w-14 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 border border-white/20 z-20 shadow-2xl"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-10 top-1/2 -translate-y-1/2 h-14 w-14 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 border border-white/20 z-20 shadow-2xl"
        >
          <ChevronRight size={28} />
        </button>

        {/* Indicators - Premium Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {OFFERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 shadow-sm ${i === currentIndex ? 'w-12 bg-primary' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSlider;
