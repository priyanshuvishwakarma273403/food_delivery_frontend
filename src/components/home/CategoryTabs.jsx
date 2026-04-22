import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { cn } from '../../utils/cn';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🛍️', color: 'bg-primary', theme: 'from-orange-50 to-white' },
  { id: 'fresh', label: 'Fresh', icon: '🥬', color: 'bg-[#26A541]', theme: 'from-green-50 to-white' },
  { id: 'summer', label: 'Summer', icon: '⛱️', color: 'bg-[#0C831F]', theme: 'from-blue-50 to-white' },
  { id: 'sweets', label: 'Sweets', icon: '🍩', color: 'bg-[#E03546]', theme: 'from-red-50 to-white' },
  { id: 'drinks', label: 'Drinks', icon: '🥤', color: 'bg-[#1A73E8]', theme: 'from-indigo-50 to-white' },
  { id: 'bakery', label: 'Bakery', icon: '🥐', color: 'bg-[#8B4513]', theme: 'from-amber-50 to-white' },
  { id: 'healthy', label: 'Healthy', icon: '🥗', color: 'bg-[#00B8D9]', theme: 'from-cyan-50 to-white' },
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
    setSearchParams(searchParams);
  };

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <section className={cn(
      "py-6 transition-all duration-500 bg-gradient-to-b",
      activeCategory.theme
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabChange(cat.id)}
                className={cn(
                  "flex flex-col items-center gap-2 min-w-[70px] transition-all duration-300 relative py-2",
                  isActive ? "scale-110" : "opacity-60 grayscale-[0.5]"
                )}
              >
                <div className={cn(
                  "h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border-2 transition-all duration-300",
                  isActive 
                    ? `${cat.color} border-transparent text-white shadow-lg` 
                    : "bg-white border-gray-100 text-gray-400"
                )}>
                  {cat.icon}
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  isActive ? "text-[#1C1C1C]" : "text-[#686B78]"
                )}>
                  {cat.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className={cn("absolute -bottom-1 h-1 w-6 rounded-full", cat.color)}
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
