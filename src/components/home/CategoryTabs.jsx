import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { cn } from '../../utils/cn';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🛍️', color: 'bg-[#FC8019]', theme: 'from-orange-50/50 to-white', glow: 'shadow-orange-200' },
  { id: 'fresh', label: 'Fresh', icon: '🥬', color: 'bg-[#26A541]', theme: 'from-green-50/50 to-white', glow: 'shadow-green-200' },
  { id: 'summer', label: 'Summer', icon: '⛱️', color: 'bg-[#0C831F]', theme: 'from-emerald-50/50 to-white', glow: 'shadow-emerald-200' },
  { id: 'sweets', label: 'Sweets', icon: '🍩', color: 'bg-[#E03546]', theme: 'from-red-50/50 to-white', glow: 'shadow-red-200' },
  { id: 'drinks', label: 'Drinks', icon: '🥤', color: 'bg-[#1A73E8]', theme: 'from-blue-50/50 to-white', glow: 'shadow-blue-200' },
  { id: 'bakery', label: 'Bakery', icon: '🥐', color: 'bg-[#8B4513]', theme: 'from-amber-50/50 to-white', glow: 'shadow-amber-200' },
  { id: 'healthy', label: 'Healthy', icon: '🥗', color: 'bg-[#00B8D9]', theme: 'from-cyan-50/50 to-white', glow: 'shadow-cyan-200' },
];

const CategoryTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('category') || 'all';

  const handleTabChange = (id) => {
    if (id === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', id);
    }
    setSearchParams(searchParams, { replace: true });
    // Scroll to top of categories section when changed
    const section = document.getElementById('category-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <section id="category-section" className={cn(
      "py-10 transition-all duration-700 bg-gradient-to-b border-t border-gray-50",
      activeCategory.theme
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-xl md:text-2xl font-black text-[#1C1C1C] tracking-tight mb-2">Curated for your Cravings</h3>
          <div className={cn("h-1 w-12 rounded-full transition-all duration-500", activeCategory.color)} />
        </div>

        <div className="flex items-center justify-center gap-4 md:gap-8 overflow-x-auto no-scrollbar pb-6 px-4">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleTabChange(cat.id)}
                className={cn(
                  "flex flex-col items-center gap-3 transition-all duration-500 relative py-2 min-w-[80px]",
                  !isActive && "opacity-40 grayscale-[0.8] hover:opacity-100 hover:grayscale-0"
                )}
              >
                <div className={cn(
                  "h-16 w-16 md:h-20 md:w-20 rounded-[24px] flex items-center justify-center text-3xl md:text-4xl transition-all duration-500 relative",
                  isActive 
                    ? `${cat.color} text-white shadow-[0_15px_30px_-5px] ${cat.glow} scale-110 rotate-3` 
                    : "bg-white border border-gray-100 text-gray-400 hover:border-gray-200"
                )}>
                  {cat.icon}
                  {isActive && (
                    <motion.div 
                      layoutId="active-glow"
                      className="absolute inset-0 rounded-[24px] blur-xl opacity-50 -z-10"
                      style={{ backgroundColor: isActive ? 'currentColor' : 'transparent' }}
                    />
                  )}
                </div>
                
                <span className={cn(
                  "text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300",
                  isActive ? "text-[#1C1C1C] translate-y-1" : "text-[#686B78]"
                )}>
                  {cat.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-pill-premium"
                    className={cn("absolute -bottom-2 h-1.5 w-8 rounded-full", cat.color)}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryTabs;
