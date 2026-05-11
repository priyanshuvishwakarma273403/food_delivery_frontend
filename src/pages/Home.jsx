import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, ArrowRight, TrendingUp, Flame, Star, Clock, ChevronRight, Sparkles, Shield, Zap, Heart, Crown } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import restaurantService from '../services/restaurantService';
import { CUISINE_CATEGORIES } from '../data/restaurants';
import StoryViewer from '../components/common/StoryViewer';
import MoodSearch from '../components/ai/MoodSearch';
import { RestaurantSkeleton } from '../components/common/Skeleton';
import { Spinner } from '../components/common/Loader';
import Button from '../components/common/Button';
import CategoryTabs from '../components/home/CategoryTabs';
import LocationModal from '../components/layout/LocationModal';
import ReviewsModal from '../components/home/ReviewsModal';
import { useLocationStore } from '../store/locationStore';
import Stories from '../components/home/Stories';
import OfferSlider from '../components/home/OfferSlider';
import OrderPulse from '../components/home/OrderPulse';
import { useAuthStore } from '../store/authStore';





const HERO_THEMES = {
  all: {
    primary: '#FC8019',
    secondary: '#FF9F54',
    gradient: 'from-[#FC8019]/20 via-[#FC8019]/5 to-transparent',
    accent: 'bg-[#FC8019]',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=80',
    light: 'bg-orange-50'
  },
  fresh: {
    primary: '#26A541',
    secondary: '#34D399',
    gradient: 'from-[#26A541]/20 via-[#26A541]/5 to-transparent',
    accent: 'bg-[#26A541]',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1800&q=80',
    light: 'bg-green-50'
  },
  summer: {
    primary: '#0C831F',
    secondary: '#10B981',
    gradient: 'from-[#0C831F]/20 via-[#0C831F]/5 to-transparent',
    accent: 'bg-[#0C831F]',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=1800&q=80',
    light: 'bg-emerald-50'
  },
  sweets: {
    primary: '#E03546',
    secondary: '#F87171',
    gradient: 'from-[#E03546]/20 via-[#E03546]/5 to-transparent',
    accent: 'bg-[#E03546]',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1800&q=80',
    light: 'bg-red-50'
  },
  drinks: {
    primary: '#1A73E8',
    secondary: '#60A5FA',
    gradient: 'from-[#1A73E8]/20 via-[#1A73E8]/5 to-transparent',
    accent: 'bg-[#1A73E8]',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=1800&q=80',
    light: 'bg-blue-50'
  },
  bakery: {
    primary: '#8B4513',
    secondary: '#D97706',
    gradient: 'from-[#8B4513]/20 via-[#8B4513]/5 to-transparent',
    accent: 'bg-[#8B4513]',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1800&q=80',
    light: 'bg-amber-50'
  },
  healthy: {
    primary: '#00B8D9',
    secondary: '#22D3EE',
    gradient: 'from-[#00B8D9]/20 via-[#00B8D9]/5 to-transparent',
    accent: 'bg-[#00B8D9]',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1800&q=80',
    light: 'bg-cyan-50'
  },
};

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { currentLocation, detectLocation } = useLocationStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const activeCategory = searchParams.get('category') || 'all';
  const theme = useMemo(() => HERO_THEMES[activeCategory] || HERO_THEMES.all, [activeCategory]);


  const { data: restaurantsResponse, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => restaurantService.getAllRestaurants(),
    retry: 1,
    refetchOnWindowFocus: false,
    onSuccess: (data) => console.log("Restaurants Data Loaded:", data),
    onError: (err) => console.error("Restaurants Fetch Error:", err)
  });

  useEffect(() => {
    if (isLoading) {
      console.log("Restaurants are currently loading...");
    }
  }, [isLoading]);

  const restaurants = restaurantsResponse?.data || [];

  const topRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const totalRestaurants = restaurants.length || 2000;
  const totalFoods = restaurants.reduce((acc, r) => acc + (r.menuItems?.length || 0), 0) || 10000;


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div className="bg-white pb-20 md:pb-0">

      {/* ── Hero Section ── */}
      <section className="relative min-h-[500px] md:h-[620px] flex items-center overflow-hidden transition-colors duration-700">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            key={theme.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={theme.image} 
            alt="Food hero"
            className="w-full h-full object-cover"
          />
          
          {/* Dynamic Overlays */}
          <motion.div 
            animate={{ background: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)` }}
            className="absolute inset-0 z-10" 
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`gradient-${activeCategory}`}
            className={`absolute inset-0 z-20 bg-gradient-to-br ${theme.gradient} mix-blend-overlay`}
          />

          {/* Decorative Floating Elements */}
          <div className="absolute inset-0 z-15 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute top-20 right-[15%] w-64 h-64 rounded-full blur-[80px] opacity-30 ${theme.accent}`}
            />
            <motion.div 
              animate={{ 
                y: [0, 30, 0],
                rotate: [0, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className={`absolute bottom-10 right-[5%] w-80 h-80 rounded-full blur-[100px] opacity-20 ${theme.accent}`}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-30 py-12 md:py-0">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 shadow-xl"
            >
              <div className={`h-2 w-2 rounded-full animate-pulse transition-colors duration-500`} style={{ backgroundColor: theme.primary }} />
              <span className="text-white text-xs md:text-sm font-bold tracking-wide uppercase">{totalRestaurants}+ restaurants live near you</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.95] tracking-tight">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Crave the <br />
              </motion.span>
              <motion.span 
                key={activeCategory}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{ color: theme.primary }}
                className="drop-shadow-2xl filter brightness-110"
              >
                {activeCategory === 'all' ? 'Best Food' : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-2xl text-gray-100 mb-10 max-w-xl leading-relaxed font-medium drop-shadow-md"
            >
              Discover <span className="font-black" style={{ color: theme.primary }}>{totalFoods}+</span> dishes from top-rated kitchens. Freshness delivered in <span className="font-black" style={{ color: theme.primary }}>30 mins</span>.
            </motion.p>

            {/* Search Box with Theme Accent */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col md:flex-row overflow-hidden max-w-3xl border border-white/20 p-2 gap-1 group"
            >
              <div 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all flex-1"
              >
                <MapPin style={{ color: theme.primary }} className="shrink-0 group-hover:scale-110 transition-transform" size={22} strokeWidth={2.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-black leading-none mb-1 uppercase tracking-widest">Your Location</p>
                  <p className="text-[#1C1C1C] text-sm font-bold truncate">
                    {currentLocation?.name || 'Select Location'}
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); detectLocation(); }}
                  className="hover:bg-gray-200 p-2 rounded-xl transition-colors shrink-0"
                  title="Detect my location"
                >
                  <Navigation size={18} style={{ color: theme.primary }} />
                </button>
              </div>

              <div className="h-10 w-[1px] bg-gray-100 self-center hidden md:block" />

              <div className="flex items-center gap-4 px-6 py-4 rounded-2xl flex-[1.5] group/input">
                <Search className="text-gray-300 group-focus-within/input:text-primary transition-colors" size={22} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-black leading-none mb-1 uppercase tracking-widest">Search</p>
                  <input 
                    type="text" 
                    placeholder="Search for 'Biryani' or 'Pizza'..." 
                    className="bg-transparent outline-none text-[#1C1C1C] text-sm w-full font-bold min-w-0 placeholder:font-normal placeholder:text-gray-400"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                type="button" 
                style={{ backgroundColor: theme.primary }}
                className="text-white font-black px-10 py-4 rounded-2xl transition-all text-sm tracking-widest uppercase shadow-lg shadow-primary/20 md:w-auto w-full"
              >
                Find Food
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Offer Slider ── */}
      <OfferSlider />

      {/* ── Trending Stories ── */}
      <Stories />

      {/* ── Stats Bar ── */}
      <section className="transition-colors duration-700" style={{ backgroundColor: theme.primary }}>
        <div className="container mx-auto px-4 md:px-6 py-6 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: `${totalRestaurants}+`, label: 'Restaurants', icon: <Flame size={20} /> },
            { value: `${totalFoods}+`, label: 'Dishes', icon: <Sparkles size={20} /> },
            { value: '30 min', label: 'Avg. Delivery', icon: <Zap size={20} /> },
            { value: '4.5★', label: 'Avg. Rating', icon: <Star size={20} /> },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-center gap-4 text-white"
            >
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/10">{stat.icon}</div>
              <div>
                <p className="text-xl md:text-3xl font-black leading-none">{stat.value}</p>
                <p className="text-[10px] font-bold opacity-80 mt-1 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What's On Your Mind (Cuisines) ── */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] tracking-tight">What's on your mind?</h2>
              <p className="text-[#686B78] text-sm mt-1">Explore our wide variety of cuisines</p>
            </div>
          </div>

          <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-4 md:gap-8 -mx-4 px-4 snap-x snap-mandatory">
            {CUISINE_CATEGORIES.map((cuisine, index) => (
              <Link key={index} to={`/restaurants?cuisine=${cuisine.name}`} className="snap-start shrink-0">
                <motion.div
                  whileHover={{ scale: 1.06, translateY: -4 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="h-20 w-20 md:h-28 md:w-28 rounded-full bg-[#F5F5F6] border-2 border-[#F0F0F0] group-hover:border-primary/30 group-hover:shadow-lg flex items-center justify-center text-4xl md:text-6xl transition-all duration-300 overflow-hidden">
                    <span>{cuisine.icon}</span>
                  </div>
                  <span className="font-semibold text-xs md:text-sm text-[#1C1C1C] group-hover:text-primary transition-colors text-center whitespace-nowrap leading-tight">
                    {cuisine.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CategoryTabs />

      {/* ── Section Divider ── */}
      <div className="h-2 bg-[#F5F5F5]" />


      {/* ── AI Mood Search ── */}
      <section className="bg-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <MoodSearch />
        </div>
      </section>

      <div className="h-2 bg-[#F5F5F5]" />

      {/* ── Top Rated Restaurants ── */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={18} className="text-primary" />
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Trending Now</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] tracking-tight">Top Rated Near You</h2>
              <p className="text-[#686B78] text-sm mt-1 hidden sm:block">Handpicked restaurants based on ratings & reviews</p>
            </div>
            <Link 
              to="/restaurants" 
              className="flex items-center gap-1.5 text-primary font-black text-sm hover:gap-2.5 transition-all group border border-primary/20 hover:border-primary px-4 py-2 rounded-xl hover:bg-primary/5"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-6">
               <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {Array(8).fill(0).map((_, i) => (
                    <RestaurantSkeleton key={i} />
                  ))}
               </div>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-center py-6 bg-[#FC8019]/5 rounded-2xl border border-dashed border-primary/20"
               >
                  <p className="text-xs md:text-sm font-bold text-primary px-4">
                    🚀 Kitchen is warming up! The backend (Render free tier) takes about 30s to start. <br className="hidden sm:block"/>
                    Hang tight, your food data is on the way!
                  </p>
               </motion.div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-3xl border border-red-100">
               <div className="h-12 w-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap size={24} />
               </div>
               <h3 className="text-lg font-black text-red-900 mb-1">Server Connection Issue</h3>
               <p className="text-xs text-red-700/70 max-w-xs mx-auto mb-6 font-bold">Please check if the backend is running or refresh the page.</p>
               <Button 
                 onClick={() => window.location.reload()}
                 className="bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200 text-xs px-6"
               >
                 Retry Connection
               </Button>
            </div>
          ) : topRestaurants.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {topRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
               <div className="h-12 w-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} />
               </div>
               <h3 className="text-lg font-black text-[#1C1C1C] mb-1">No Data from Admin</h3>
               <p className="text-xs text-[#686B78] max-w-xs mx-auto font-bold uppercase tracking-widest">Please add restaurants in Admin Panel</p>
            </div>
          )}
        </div>
      </section>


      <div className="h-2 bg-[#F5F5F5]" />

      {/* ── Browse by Category ── */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-2 tracking-tight">Browse by Category</h2>
          <p className="text-[#686B78] text-sm mb-8">Quick filters for your cravings</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { label: 'Pure Veg', emoji: '🥬', bg: 'bg-green-50', border: 'border-green-200', hover: 'hover:border-green-400 hover:bg-green-100', filter: 'veg' },
              { label: 'Chicken', emoji: '🍗', bg: 'bg-red-50', border: 'border-red-200', hover: 'hover:border-red-400 hover:bg-red-100', filter: 'chicken' },
              { label: 'Mutton', emoji: '🍖', bg: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:border-orange-400 hover:bg-orange-100', filter: 'mutton' },
              { label: 'Fish', emoji: '🐟', bg: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:border-blue-400 hover:bg-blue-100', filter: 'fish' },
              { label: 'Egg', emoji: '🥚', bg: 'bg-yellow-50', border: 'border-yellow-200', hover: 'hover:border-yellow-400 hover:bg-yellow-100', filter: 'egg' },
            ].map((cat, i) => (
              <Link key={i} to={`/restaurants?filter=${cat.filter}`}>
                <motion.div 
                  whileHover={{ y: -4 }} 
                  whileTap={{ scale: 0.97 }}
                  className={`p-5 md:p-6 rounded-2xl border-2 ${cat.bg} ${cat.border} ${cat.hover} cursor-pointer transition-all duration-200 group`}
                >
                  <span className="text-3xl md:text-4xl">{cat.emoji}</span>
                  <p className="text-xs md:text-sm font-bold mt-3 text-[#1C1C1C] group-hover:text-primary transition-colors">{cat.label}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#F5F5F5]" />

      {/* ── Why Tomato ── */}
      <section className="bg-white py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-2 tracking-tight text-center">Why Choose Tomato?</h2>
          <p className="text-[#686B78] text-sm mb-10 text-center">India's most trusted food delivery platform</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <Zap size={28} className="text-[#FC8019]" />, title: 'Lightning Fast', desc: 'Average delivery in just 25-35 minutes, guaranteed fresh.' },
              { icon: <Shield size={28} className="text-[#26A541]" />, title: 'Safe & Hygienic', desc: 'Every restaurant is quality-checked and hygiene-verified.' },
              { icon: <Heart size={28} className="text-primary" />, title: '10,000+ Choices', desc: 'From local street food to fine dining, we have the largest variety in India.' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-[#F0F0F0] hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-50 group-hover:bg-primary/5 rounded-2xl mb-4 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-black text-[#1C1C1C] mb-2 text-base">{item.title}</h3>
                <p className="text-sm text-[#686B78] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-2 bg-[#F5F5F5]" />

      {/* ── Tomato Gold Section ── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-gradient-to-br from-[#1C1C1C] via-[#2D2D2D] to-[#1C1C1C] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.3)]"
          >
            {/* Animated Gold Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="max-w-xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 mb-8">
                  <Crown className="text-yellow-500" size={16} />
                  <span className="text-yellow-500 text-xs font-black uppercase tracking-widest">Tomato Gold</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                  One membership, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">unlimited benefits</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {[
                    { icon: '🚀', text: 'Free delivery on all orders' },
                    { icon: '💰', text: 'Flat 10% extra coins back' },
                    { icon: '⭐', text: 'Priority customer support' },
                    { icon: '💎', text: 'Exclusive restaurant offers' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-white/80 text-sm font-bold">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <button className="group bg-yellow-500 hover:bg-yellow-400 text-[#1C1C1C] px-10 py-5 rounded-[2rem] font-black text-sm tracking-widest uppercase transition-all shadow-[0_20px_50px_rgba(234,179,8,0.3)] flex items-center gap-4 mx-auto md:mx-0">
                  Get Tomato Gold @ ₹99
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
              
              <div className="relative">
                {/* 3D-like Card Preview */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [5, 2, 5]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-64 h-80 md:w-80 md:h-[450px] bg-gradient-to-br from-yellow-400 to-amber-600 rounded-[2.5rem] p-8 shadow-[0_50px_100px_rgba(234,179,8,0.4)] border-4 border-yellow-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Crown size={40} className="text-[#1C1C1C]" strokeWidth={2.5} />
                        <span className="text-[10px] font-black text-[#1C1C1C] uppercase tracking-widest">Premium</span>
                      </div>
                      <div className="mt-8">
                        <p className="text-[#1C1C1C] text-2xl font-black tracking-tight leading-none">TOMATO</p>
                        <p className="text-[#1C1C1C] text-5xl font-black tracking-tighter">GOLD</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="h-2 w-full bg-[#1C1C1C]/10 rounded-full" />
                      <div className="h-2 w-2/3 bg-[#1C1C1C]/10 rounded-full" />
                      <div className="flex justify-between items-end mt-8">
                        <div>
                          <p className="text-[8px] font-black text-[#1C1C1C] uppercase opacity-50">Member Name</p>
                          <p className="text-[#1C1C1C] font-black uppercase text-sm tracking-widest">{user?.name || 'ASHU YADAV'}</p>
                        </div>
                        <div className="bg-[#1C1C1C] text-white px-3 py-1 rounded-lg text-[10px] font-black">
                           VALID 2027
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Gloss Effect */}
                  <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-shine pointer-events-none" />
                </motion.div>
                
                {/* Floating Coins Decorations */}
                <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -top-10 -left-10 text-4xl">💰</motion.div>
                <motion.div animate={{ y: [0, -30, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-10 -right-10 text-4xl">✨</motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="h-2 bg-[#F5F5F5]" />

      {/* ── Google-Style Testimonials ── */}
      <section className="bg-white py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 shadow-sm"
              >
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#4285F4" strokeWidth={0} />)}
                </div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">4.8/5 on Google Reviews</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shadow-sm"
              >
                <div className="flex -space-x-2">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="h-5 w-5 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                       <img src={`https://i.pravatar.cc/100?u=user${i}`} alt="user" className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest">5 Million+ Total Users</span>
              </motion.div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-[#1C1C1C] mb-4 tracking-tight">What our foodies say</h2>
            <p className="text-[#686B78] text-sm md:text-lg max-w-2xl mx-auto font-medium">Authentic reviews from our community across India</p>
          </div>

          {/* Desktop Grid / Mobile Marquee */}
          <div className="relative overflow-hidden py-10">
            {/* Mobile: Infinite Horizontal Slider */}
            <div className="md:hidden">
              <motion.div 
                animate={{ x: [0, -1200] }}
                transition={{ 
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
                className="flex gap-4 px-4"
              >
                {[
                  { name: 'Ashu Yadav', date: '2 days ago', text: 'The best food delivery app in Mumbai! Delivery is always before time.', avatar: 'https://i.pravatar.cc/150?u=ashu' },
                  { name: 'Faiz Khan', date: '1 week ago', text: 'Love the variety of cuisines. The dynamic hero section is so easy to use.', avatar: 'https://i.pravatar.cc/150?u=faiz' },
                  { name: 'Ankit Kumar', date: '3 weeks ago', text: 'Lightning fast delivery. I ordered Biryani and it reached in 20 minutes!', avatar: 'https://i.pravatar.cc/150?u=ankit' },
                  { name: 'Rahul Sharma', date: '1 month ago', text: 'Great experience overall. The food was hot and fresh.', avatar: 'https://i.pravatar.cc/150?u=rahul' },
                  // Repeat for infinite effect
                  { name: 'Ashu Yadav', date: '2 days ago', text: 'The best food delivery app in Mumbai! Delivery is always before time.', avatar: 'https://i.pravatar.cc/150?u=ashu' },
                  { name: 'Faiz Khan', date: '1 week ago', text: 'Love the variety of cuisines. The dynamic hero section is so easy to use.', avatar: 'https://i.pravatar.cc/150?u=faiz' },
                ].map((review, i) => (
                  <div 
                    key={i}
                    className="min-w-[280px] bg-white p-6 rounded-[2rem] shadow-xl border border-gray-50 relative"
                  >
                    <div className="absolute top-6 right-6 opacity-20">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-4" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#1C1C1C]">{review.name}</p>
                        <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {[1,2,3,4,5].map(star => <Star key={star} size={10} fill="#FBBC05" strokeWidth={0} />)}
                    </div>
                    <p className="text-[#1C1C1C] text-xs leading-relaxed font-medium">"{review.text}"</p>
                  </div>
                ))}
              </motion.div>
              {/* Gradient overlays for smooth fading at edges */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>

            {/* Desktop: Professional Grid */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              {[
                { name: 'Ashu Yadav', date: '2 days ago', text: 'The best food delivery app in Mumbai! Delivery is always before time and the packaging is superb. Highly recommended for daily office lunches.', avatar: 'https://i.pravatar.cc/150?u=ashu' },
                { name: 'Faiz Khan', date: '1 week ago', text: 'Love the variety of cuisines. The dynamic hero section and category tabs make it so easy to find exactly what I am craving for. Great job!', avatar: 'https://i.pravatar.cc/150?u=faiz' },
                { name: 'Ankit Kumar', date: '3 weeks ago', text: 'Lightning fast delivery. I ordered Biryani and it reached me in 20 minutes! The live tracking feature is really smooth and accurate.', avatar: 'https://i.pravatar.cc/150?u=ankit' }
              ].map((review, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 relative group"
                >
                  <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-100 transition-opacity">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="h-5" />
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                      <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-base font-black text-[#1C1C1C]">{review.name}</p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-6">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="#FBBC05" strokeWidth={0} />)}
                  </div>
                  <p className="text-[#1C1C1C] text-base leading-relaxed font-medium">"{review.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-16 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
               <div className="flex -space-x-1">
                 {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FBBC05" strokeWidth={0} />)}
               </div>
               <span className="text-xs font-black text-[#1C1C1C]">4.8 Rating from 2,540+ Customers</span>
            </div>
            
            <button 
              onClick={() => setIsReviewsModalOpen(true)}
              className="group relative bg-[#1C1C1C] text-white px-12 py-5 rounded-[2rem] font-black text-sm tracking-[0.2em] uppercase hover:bg-primary transition-all shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-primary/30 flex items-center gap-4"
            >
              <span>See All 2,540 Reviews</span>
              <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                <ChevronRight size={20} />
              </div>
            </button>
            
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">⭐ Verified by Google Trust</p>
          </motion.div>
        </div>
      </section>

      <div className="h-2 bg-[#F5F5F5]" />

      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />

      <ReviewsModal 
        isOpen={isReviewsModalOpen} 
        onClose={() => setIsReviewsModalOpen(false)} 
      />

      <OrderPulse />
    </div>

  );
};

export default Home;
