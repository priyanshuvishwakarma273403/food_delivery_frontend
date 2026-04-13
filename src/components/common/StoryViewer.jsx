import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const MOCK_STORIES = [
  { id: 1, restaurant: 'Burger King', offer: 'Flat 50% OFF on Whopper', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&w=800&q=80', logo: '🍔' },
  { id: 2, restaurant: 'Spice Garden', offer: 'Special Dum Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800', logo: '🍲' },
  { id: 3, restaurant: 'Pizza Express', offer: 'Buy 1 Get 1 Free', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800', logo: '🍕' },
  { id: 4, restaurant: 'Sweet Dreams', offer: 'Truffle Cake at ₹199', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800', logo: '🎂' },
  { id: 5, restaurant: 'Healthy Hub', offer: 'New Keto Bowls', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', logo: '🥗' },
];

const StoryViewer = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeStoryIndex === null || isPaused) return;

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          handleNext();
          return 0;
        }
        return p + 2; // Increases every 100ms -> 5 secs total
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStoryIndex, isPaused]);

  const handleNext = () => {
    if (activeStoryIndex < MOCK_STORIES.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
      setProgress(0);
    }
  };

  const closeStory = () => {
    setActiveStoryIndex(null);
    setProgress(0);
  };

  return (
    <>
      {/* Story Thumbnails List */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x pt-2">
        {MOCK_STORIES.map((story, idx) => (
          <div 
            key={story.id} 
            className="flex flex-col items-center gap-2 cursor-pointer snap-start"
            onClick={() => { setActiveStoryIndex(idx); setProgress(0); }}
          >
            <div className="relative w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-white rounded-full p-0.5">
                <img src={story.image} alt="Story" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <span className="text-xs font-bold text-text-primary text-center truncate w-20">{story.restaurant}</span>
          </div>
        ))}
      </div>

      {/* Fullscreen Story Viewer */}
      <AnimatePresence>
        {activeStoryIndex !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center sm:p-4"
          >
            <div className="w-full h-full sm:w-[400px] sm:h-[800px] sm:rounded-3xl bg-gray-900 relative overflow-hidden flex flex-col">
              
              {/* Progress Bar */}
              <div className="absolute top-4 left-0 w-full px-4 flex gap-1 z-20">
                {MOCK_STORIES.map((_, i) => (
                  <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-white rounded-full transition-all duration-100 ease-linear`}
                      style={{ 
                        width: i === activeStoryIndex ? `${progress}%` : i < activeStoryIndex ? '100%' : '0%' 
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Header */}
              <div className="absolute top-8 left-0 w-full px-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">{MOCK_STORIES[activeStoryIndex].logo}</div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{MOCK_STORIES[activeStoryIndex].restaurant}</p>
                    <p className="text-white/70 text-xs">Sponsored</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setIsPaused(!isPaused)} className="text-white">
                    {isPaused ? <Play size={20} /> : <Pause size={20} />}
                  </button>
                  <button onClick={closeStory} className="text-white bg-black/40 p-1.5 rounded-full">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full object-cover">
                <img 
                  src={MOCK_STORIES[activeStoryIndex].image} 
                  alt="Story content" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
              </div>

              {/* Story Content / Footer */}
              <div className="absolute bottom-8 left-0 w-full px-6 z-20 text-center">
                <motion.h2 
                  key={activeStoryIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-black text-white mb-6 drop-shadow-lg"
                >
                  {MOCK_STORIES[activeStoryIndex].offer}
                </motion.h2>
                <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg animate-bounce shadow-xl">
                  Order Now
                </button>
              </div>

              {/* Touch Controls (Invisible overlays) */}
              <div className="absolute inset-0 z-10 flex">
                <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
                <div 
                  className="w-2/3 h-full cursor-pointer" 
                  onClick={handleNext}
                  onPointerDown={() => setIsPaused(true)}
                  onPointerUp={() => setIsPaused(false)}
                />
              </div>

              {/* Desktop Chevrons */}
              <button onClick={handlePrev} className="hidden sm:flex absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full items-center justify-center text-white hover:bg-white/40">
                <ChevronLeft />
              </button>
              <button onClick={handleNext} className="hidden sm:flex absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full items-center justify-center text-white hover:bg-white/40">
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StoryViewer;
