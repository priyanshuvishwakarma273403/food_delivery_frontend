import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  X,
  Star,
  Check
} from 'lucide-react';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { CUISINES } from '../constants';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

// Dummy data
const ALL_RESTAURANTS = [
  { id: 1, name: 'The Burger King', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80', cuisine: 'Burgers', rating: 4.5, deliveryTime: 25, minOrder: 150, isOpen: true, offer: '50% OFF' },
  { id: 2, name: 'Spice Garden', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80', cuisine: 'Biryani', rating: 4.2, deliveryTime: 35, minOrder: 250, isOpen: true },
  { id: 3, name: 'Sushi Zen', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', cuisine: 'Chinese', rating: 4.8, deliveryTime: 45, minOrder: 500, isOpen: false },
  { id: 4, name: 'Pizza Express', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80', cuisine: 'Pizza', rating: 4.4, deliveryTime: 20, minOrder: 300, isOpen: true, offer: 'Free Delivery' },
  { id: 5, name: 'Healthy Hub', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', cuisine: 'Salads', rating: 4.6, deliveryTime: 30, minOrder: 200, isOpen: true },
  { id: 6, name: 'South Treats', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80', cuisine: 'South Indian', rating: 4.1, deliveryTime: 25, minOrder: 100, isOpen: true },
  { id: 7, name: 'Sweet Dreams', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80', cuisine: 'Desserts', rating: 4.5, deliveryTime: 15, minOrder: 50, isOpen: true },
  { id: 8, name: 'Curry Pot', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80', cuisine: 'North Indian', rating: 3.9, deliveryTime: 40, minOrder: 300, isOpen: true },
];

const Restaurants = () => {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filters = [
    { id: 'veg', label: 'Veg Only' },
    { id: 'rating', label: 'Rating 4.0+' },
    { id: 'fast', label: 'Fast Delivery' },
    { id: 'offers', label: 'Great Offers' },
  ];

  const toggleFilter = (id) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredRestaurants = useMemo(() => {
    return ALL_RESTAURANTS.filter(res => {
      const matchSearch = res.name.toLowerCase().includes(search.toLowerCase()) || 
                          res.cuisine.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;
      
      if (activeFilters.includes('rating') && res.rating < 4.0) return false;
      if (activeFilters.includes('fast') && res.deliveryTime > 30) return false;
      if (activeFilters.includes('offers') && !res.offer) return false;
      
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return a.deliveryTime - b.deliveryTime;
      return 0;
    });
  }, [search, activeFilters, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Search & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-text-primary mb-2">Order Food Online</h1>
          <p className="text-text-secondary">Discover best food & drinks in your area</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for restaurants or cuisines..." 
            className="w-full bg-white border border-gray-100 shadow-premium rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-10 sticky top-[72px] z-30 py-4 -mx-4 px-4 bg-background/80 backdrop-blur-md">
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full gap-2 border-gray-200 text-text-primary hover:border-primary"
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal size={16} /> Filters
        </Button>
        
        <div className="h-6 w-[1px] bg-gray-200 mx-2 hidden md:block" />
        
        <div className="flex flex-wrap gap-3">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200",
                activeFilters.includes(filter.id)
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-white border-gray-100 text-text-secondary hover:border-gray-300"
              )}
            >
              <div className="flex items-center gap-2">
                {activeFilters.includes(filter.id) && <Check size={14} />}
                {filter.label}
              </div>
            </button>
          ))}
        </div>

        <div className="ml-auto hidden md:flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort By:</span>
          <select 
            className="bg-transparent text-sm font-bold text-text-primary outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="rating">Rating</option>
            <option value="time">Delivery Time</option>
            <option value="relevance">Popularity</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {filteredRestaurants.map((res) => (
            <motion.div
              key={res.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <RestaurantCard restaurant={res} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredRestaurants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="h-48 w-48 mb-6 opacity-40">
            <Search size={120} className="w-full h-full text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary">No results found</h3>
          <p className="text-text-secondary mt-2">Try adjusting your filters or search terms</p>
          <Button 
            variant="ghost" 
            className="mt-6 text-primary"
            onClick={() => { setSearch(''); setActiveFilters([]); }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

// Helper inside file for simplicity
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export default Restaurants;
