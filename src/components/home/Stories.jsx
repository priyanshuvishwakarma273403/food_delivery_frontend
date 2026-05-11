import { motion } from 'framer-motion';

const CRAVINGS = [
  { id: 1, name: 'Biryani', video: 'https://cdn.pixabay.com/video/2021/08/21/85750-591148818_large.mp4', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200' },
  { id: 2, name: 'Pizza', video: 'https://cdn.pixabay.com/video/2023/11/01/187309-880026210_large.mp4', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' },
  { id: 3, name: 'Burgers', video: 'https://cdn.pixabay.com/video/2022/05/24/117965-713247076_large.mp4', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: 4, name: 'Desserts', video: 'https://cdn.pixabay.com/video/2020/03/15/33621-397856424_large.mp4', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?w=200' },
  { id: 5, name: 'Healthy', video: 'https://cdn.pixabay.com/video/2021/09/01/87229-598585474_large.mp4', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' },
  { id: 6, name: 'Coffee', video: 'https://cdn.pixabay.com/video/2020/03/30/34720-399723230_large.mp4', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200' },
  { id: 7, name: 'Chinese', video: 'https://cdn.pixabay.com/video/2021/07/27/82967-582531631_large.mp4', image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=200' },
];

const Stories = () => {
  const scrollToCategory = (category) => {
    const element = document.getElementById('category-tabs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Logic to trigger category change can be added via a store or event
    }
  };

  return (
    <section className="bg-white py-6 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-4">Trending Cravings</h3>
        <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 scrollbar-hide snap-x snap-mandatory">
          {CRAVINGS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToCategory(item.name)}
              className="flex flex-col items-center gap-3 cursor-pointer snap-start min-w-[80px]"
            >
              <div className="relative group">
                {/* Instagram-style Ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-full p-[2px] animate-spin-slow group-hover:p-[3px] transition-all duration-300">
                  <div className="bg-white rounded-full h-full w-full" />
                </div>
                
                {/* Video/Image Container */}
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden relative z-10 border-2 border-white shadow-xl">
                  {/* Background Fallback Image */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  {/* High Quality Video on Hover/Loop */}
                  <video
                    src={item.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                
                {/* LIVE Badge for some */}
                {item.id % 3 === 1 && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20 bg-primary text-[8px] font-black text-white px-2 py-0.5 rounded-full border-2 border-white shadow-lg uppercase tracking-tighter">
                    LIVE
                  </div>
                )}
              </div>
              <span className="text-[10px] md:text-xs font-black text-[#1C1C1C] uppercase tracking-wider">{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;
