import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, Gift, CreditCard } from 'lucide-react';

const OFFERS = [
  {
    id: 1,
    title: 'Up to 60% OFF',
    subtitle: 'On your first 3 orders',
    code: 'WELCOME60',
    color: 'from-[#FF512F] to-[#DD2476]',
    icon: <Zap size={32} className="text-white/30" />,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600'
  },
  {
    id: 2,
    title: 'Free Delivery',
    subtitle: 'On all orders above ₹199',
    code: 'FREEDEL',
    color: 'from-[#00b09b] to-[#96c93d]',
    icon: <Gift size={32} className="text-white/30" />,
    image: 'https://images.unsplash.com/photo-1526367790999-0150786486a9?w=600'
  },
  {
    id: 3,
    title: 'Flat ₹150 OFF',
    subtitle: 'Using HDFC Bank Cards',
    code: 'HDFC150',
    color: 'from-[#4facfe] to-[#00f2fe]',
    icon: <CreditCard size={32} className="text-white/30" />,
    image: 'https://images.unsplash.com/photo-1559589689-577aabd1db4f?w=600'
  }
];

const OfferSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length);

  return (
    <section className="bg-white py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6 relative group">
        <div className="relative h-48 md:h-64 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, cubicBezier: [0.34, 1.56, 0.64, 1] }}
              className={`absolute inset-0 bg-gradient-to-br ${OFFERS[currentIndex].color} flex items-center p-8 md:p-16`}
            >
              {/* Content */}
              <div className="relative z-10 w-full md:w-1/2">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block border border-white/10">
                    Exclusive Offer
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                    {OFFERS[currentIndex].title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-lg font-medium mb-6">
                    {OFFERS[currentIndex].subtitle}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="bg-white text-[#1C1C1C] px-6 py-2.5 rounded-2xl font-black text-sm shadow-xl">
                      USE CODE: <span className="text-primary ml-1">{OFFERS[currentIndex].code}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Icon */}
              <div className="absolute top-1/2 -translate-y-1/2 right-10 opacity-20 hidden md:block">
                {OFFERS[currentIndex].icon}
              </div>

              {/* Background Image Overlay */}
              <div className="absolute top-0 right-0 h-full w-1/2 hidden md:block">
                <img 
                  src={OFFERS[currentIndex].image} 
                  alt="Food" 
                  className="h-full w-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-10 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-10 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40 z-20"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {OFFERS.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferSlider;
