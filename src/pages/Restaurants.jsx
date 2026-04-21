import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  X,
  Star,
  Check,
  MapPin,
  Grid3X3,
  List
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import Skeleton, { RestaurantSkeleton } from '../components/common/Skeleton';

import { ALL_RESTAURANTS, CUISINE_CATEGORIES } from '../data/restaurants';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { cn } from '../utils/cn';
import { useEffect } from 'react';

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCuisine = searchParams.get('cuisine') || '';

  const [search, setSearch] = useState(initialSearch);
  const [activeFilters, setActiveFilters] = useState(initialCuisine ? [initialCuisine.toLowerCase()] : []);
  const [sortBy, setSortBy] = useState('rating');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);


  const filters = [
    { id: 'veg', label: 'Pure Veg', emoji: '🥬' },
    { id: 'rating', label: 'Rating 4.0+', emoji: '⭐' },
    { id: 'fast', label: 'Fast Delivery', emoji: '⚡' },
    { id: 'offers', label: 'Great Offers', emoji: '🏷️' },
    { id: 'budget', label: 'Under ₹300', emoji: '💰' },
    { id: 'premium', label: 'Premium', emoji: '👑' },
  ];

  const toggleFilter = (id) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    setVisibleCount(20);
  };

  const filteredRestaurants = useMemo(() => {
    return ALL_RESTAURANTS.filter(res => {
      const matchSearch = search === '' || 
        res.name.toLowerCase().includes(search.toLowerCase()) || 
        res.cuisine.toLowerCase().includes(search.toLowerCase()) ||
        res.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        res.menu?.some(cat => cat.items.some(item => item.name.toLowerCase().includes(search.toLowerCase())));
      if (!matchSearch) return false;
      
      if (activeFilters.includes('rating') && res.rating < 4.0) return false;
      if (activeFilters.includes('fast') && res.deliveryTime > 30) return false;
      if (activeFilters.includes('offers') && !res.offer) return false;
      if (activeFilters.includes('veg') && !res.isPureVeg) return false;
      if (activeFilters.includes('budget') && res.costForTwo > 300) return false;
      if (activeFilters.includes('premium') && res.costForTwo < 800) return false;

      // Cuisine filter
      const cuisineFilters = activeFilters.filter(f => 
        !['rating', 'fast', 'offers', 'veg', 'budget', 'premium'].includes(f)
      );
      if (cuisineFilters.length > 0) {
        const matchesCuisine = cuisineFilters.some(cf =>
          res.cuisine.toLowerCase().includes(cf) ||
          res.tags?.some(t => t.toLowerCase() === cf)
        );
        if (!matchesCuisine) return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return a.deliveryTime - b.deliveryTime;
      if (sortBy === 'cost_low') return (a.costForTwo || a.minOrder) - (b.costForTwo || b.minOrder);
      if (sortBy === 'cost_high') return (b.costForTwo || b.minOrder) - (a.costForTwo || a.minOrder);
      if (sortBy === 'popularity') return (b.totalRatings || 0) - (a.totalRatings || 0);
      return 0;
    });
  }, [search, activeFilters, sortBy]);

  const displayedRestaurants = filteredRestaurants.slice(0, visibleCount);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 sticky top-[56px] md:top-[72px] z-30">
        <div className="container mx-auto px-4 py-3 md:py-4">
          {/* Search bar + Title */}
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex items-center justify-between">
              <div className="hidden md:block">
                <h1 className="text-2xl md:text-3xl font-black text-text-primary">Order Food Online</h1>
                <p className="text-text-secondary text-sm mt-0.5">
                  {filteredRestaurants.length} restaurants found
                </p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search restaurants, cuisines, dishes..." 
                  className="w-full bg-gray-50 md:bg-white border border-gray-100 shadow-sm md:shadow-premium rounded-xl md:rounded-2xl pl-10 md:pl-12 pr-4 py-2.5 md:py-3.5 outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setVisibleCount(20); }}
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Filters - horizontal scroll on mobile */}
            <div className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={cn(
                    "px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border transition-all duration-200 whitespace-nowrap shrink-0 flex items-center gap-1.5",
                    activeFilters.includes(filter.id)
                      ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white border-gray-200 text-text-secondary hover:border-gray-300"
                  )}
                >
                  {activeFilters.includes(filter.id) ? <Check size={12} /> : <span className="text-sm">{filter.emoji}</span>}
                  {filter.label}
                </button>
              ))}
              
              <div className="h-6 w-[1px] bg-gray-200 shrink-0 hidden md:block" />
              
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider hidden md:block">Sort:</span>
                <select 
                  className="bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs md:text-sm font-bold text-text-primary outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rating">Rating</option>
                  <option value="time">Delivery Time</option>
                  <option value="popularity">Popularity</option>
                  <option value="cost_low">Cost: Low to High</option>
                  <option value="cost_high">Cost: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cuisine Quick Filters - on mobile */}
      <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex overflow-x-auto gap-3 scrollbar-hide -mx-4 px-4">
          {CUISINE_CATEGORIES.slice(0, 15).map((cuisine, idx) => (
            <button
              key={idx}
              onClick={() => toggleFilter(cuisine.name.toLowerCase())}
              className={cn(
                "flex flex-col items-center gap-1 shrink-0 transition-all",
                activeFilters.includes(cuisine.name.toLowerCase()) && "scale-110"
              )}
            >
              <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center text-xl border-2 transition-all",
                activeFilters.includes(cuisine.name.toLowerCase())
                  ? "border-primary bg-primary/10"
                  : "border-gray-100 bg-gray-50"
              )}>
                {cuisine.icon}
              </div>
              <span className={cn(
                "text-[10px] font-bold whitespace-nowrap",
                activeFilters.includes(cuisine.name.toLowerCase()) ? "text-primary" : "text-text-secondary"
              )}>{cuisine.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8">
        {/* Mobile results count */}
        <div className="md:hidden flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-text-primary">{filteredRestaurants.length} restaurants</p>
          {activeFilters.length > 0 && (
            <button 
              onClick={() => setActiveFilters([])}
              className="text-xs font-bold text-primary"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {isLoading ? (
            // Show 8 skeleton cards
            Array.from({ length: 8 }).map((_, i) => (
              <RestaurantSkeleton key={i} />
            ))
          ) : (

            <AnimatePresence>
              {displayedRestaurants.map((res) => (
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
          )}
        </div>


        {/* Load More */}
        {visibleCount < filteredRestaurants.length && (
          <div className="text-center mt-8 md:mt-12">
            <Button 
              variant="outline" 
              className="rounded-full px-8 md:px-12 py-3 border-gray-200"
              onClick={() => setVisibleCount(prev => prev + 20)}
            >
              Show More ({filteredRestaurants.length - visibleCount} remaining)
            </Button>
          </div>
        )}

        {filteredRestaurants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center">
            <div className="h-32 w-32 md:h-48 md:w-48 mb-4 md:mb-6 opacity-40">
              <Search size={100} className="w-full h-full text-gray-300" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-text-primary">No results found</h3>
            <p className="text-text-secondary mt-2 text-sm">Try adjusting your filters or search terms</p>
            <Button 
              variant="ghost" 
              className="mt-4 md:mt-6 text-primary"
              onClick={() => { setSearch(''); setActiveFilters([]); }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
