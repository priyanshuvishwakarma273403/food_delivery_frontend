import { motion } from 'framer-motion';

const CRAVINGS = [
  { 
    id: 1, 
    name: 'Biryani', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hot-food-steam-rising-from-a-plate-of-rice-41006-large.mp4',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80' 
  },
  { 
    id: 2, 
    name: 'Pizza', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-pizza-in-a-traditional-oven-40656-large.mp4',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' 
  },
  { 
    id: 3, 
    name: 'Burgers', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-a-juicy-burger-and-fries-41007-large.mp4',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' 
  },
  { 
    id: 4, 
    name: 'Desserts', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-chocolate-cake-with-fruit-40662-large.mp4',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?w=400&q=80' 
  },
  { 
    id: 5, 
    name: 'Healthy', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-fresh-vegetables-being-washed-in-a-sink-40644-large.mp4',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80' 
  },
  { 
    id: 6, 
    name: 'Coffee', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-coffee-into-a-cup-40659-large.mp4',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80' 
  },
  { 
    id: 7, 
    name: 'Chinese', 
    video: 'https://assets.mixkit.co/videos/preview/mixkit-serving-hot-noodles-with-vegetables-and-meat-40658-large.mp4',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80' 
  }
];

const Stories = () => {
  const scrollToCategory = (category) => {
    const element = document.getElementById('category-tabs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
             <motion.div
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
             >
               ✨
             </motion.div>
          </div>
          <h3 className="text-sm font-black text-[#1C1C1C] uppercase tracking-[0.2em]">Trending Cravings</h3>
        </div>
        
        <div className="flex overflow-x-auto gap-5 md:gap-10 pb-6 scrollbar-hide snap-x snap-mandatory">
          {CRAVINGS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToCategory(item.name)}
              className="flex flex-col items-center gap-4 cursor-pointer snap-start min-w-[85px]"
            >
              <div className="relative group">
                {/* Instagram-style Ring */}
                <div className="absolute -inset-[3px] bg-gradient-to-tr from-[#FFD600] via-[#FF0069] to-[#7638FA] rounded-full p-[2px] animate-spin-slow group-hover:p-[4px] transition-all duration-500 shadow-lg">
                  <div className="bg-white rounded-full h-full w-full" />
                </div>
                
                {/* Image/Video Container */}
                <div className="h-16 w-16 md:h-22 md:w-22 rounded-full overflow-hidden relative z-10 border-[3px] border-white shadow-2xl bg-gray-100">
                  {/* Background Fallback Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  
                  {/* High Quality Video - Always playing like a story */}
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-20"
                  />

                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-black/10 z-30 group-hover:bg-transparent transition-colors" />
                </div>
                
                {/* LIVE / HOT Badge */}
                {item.id % 3 === 1 && (
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-40 bg-primary text-[8px] font-black text-white px-2 py-0.5 rounded-full border-2 border-white shadow-xl uppercase tracking-widest whitespace-nowrap"
                  >
                    HOT NOW
                  </motion.div>
                )}
              </div>
              <span className="text-[10px] md:text-xs font-black text-[#1C1C1C] uppercase tracking-widest group-hover:text-primary transition-colors">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
