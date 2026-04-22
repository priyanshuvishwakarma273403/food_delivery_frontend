import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, ArrowRight, TrendingUp, Flame, Star, Clock, ChevronRight, Sparkles, Shield, Zap, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import restaurantService from '../services/restaurantService';
import { CUISINE_CATEGORIES } from '../data/restaurants';
import StoryViewer from '../components/common/StoryViewer';
import MoodSearch from '../components/ai/MoodSearch';
import { RestaurantSkeleton } from '../components/common/Skeleton';
import { Spinner } from '../components/common/Loader';
import Button from '../components/common/Button';



const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { data: restaurantsResponse, isLoading, error } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => restaurantService.getAllRestaurants()
  });

  const restaurants = restaurantsResponse?.data || [];
  const topRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const totalRestaurants = restaurants.length || 1500;
  const totalFoods = restaurants.reduce((acc, r) => acc + (r.menuItems?.length || 0), 0) || 5000;


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div className="bg-white pb-20 md:pb-0">

      {/* ── Hero Section ── */}
      <section className="relative min-h-[480px] md:h-[580px] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1800&q=80" 
            alt="Food hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 py-12 md:py-0">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white text-sm font-semibold">{totalRestaurants}+ restaurants open now</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.05] tracking-tight">
              Deliciousness<br />
              <span className="text-[#FC8019]">Delivered</span> Fast.
            </h1>
            <p className="text-base md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed font-medium">
              Order from <span className="text-[#FC8019] font-black">{totalRestaurants}+</span> restaurants and <span className="text-[#FC8019] font-black">{totalFoods}+</span> dishes. Fast, fresh & reliable.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-2xl border border-gray-100">
              <div className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 md:border-r border-gray-100 flex-1">
                <MapPin className="text-primary shrink-0" size={20} strokeWidth={2.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#686B78] font-bold leading-none mb-1">LOCATION</p>
                  <input 
                    type="text" 
                    placeholder="Enter area..." 
                    className="bg-transparent outline-none text-[#1C1C1C] text-sm w-full font-bold min-w-0 placeholder:font-normal placeholder:text-gray-400"
                  />
                </div>
                <button type="button" className="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors shrink-0">
                  <Navigation size={16} />
                </button>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 flex-[1.5]">
                <Search className="text-[#9093A4] shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-[#686B78] font-bold leading-none mb-1">SEARCH</p>
                  <input 
                    type="text" 
                    placeholder="Search food or restaurants..." 
                    className="bg-transparent outline-none text-[#1C1C1C] text-sm w-full font-bold min-w-0 placeholder:font-normal placeholder:text-gray-400"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark text-white font-black px-8 py-5 md:py-4 transition-colors text-sm tracking-wide md:w-auto w-full"
              >
                Find Food
              </button>
            </form>

          </motion.div>
        </div>
      </section>

      {/* ── Stories / Food Bites ── */}
      <section className="bg-white border-b border-[#F0F0F0] py-4">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-xs font-black text-[#1C1C1C] mb-3 flex items-center gap-2 uppercase tracking-widest">
            <Flame className="text-[#FC8019]" size={14} /> Latest Food Bites
          </p>
          <StoryViewer />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 md:px-6 py-5 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: `${totalRestaurants}+`, label: 'Restaurants', icon: <Flame size={18} /> },
            { value: `${totalFoods}+`, label: 'Dishes', icon: <Sparkles size={18} /> },
            { value: '30 min', label: 'Avg. Delivery', icon: <Zap size={18} /> },
            { value: '4.5★', label: 'Avg. Rating', icon: <Star size={18} /> },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 text-white">
              <div className="bg-white/15 p-2.5 rounded-xl">{stat.icon}</div>
              <div>
                <p className="text-lg md:text-2xl font-black leading-none">{stat.value}</p>
                <p className="text-[11px] font-semibold opacity-75 mt-0.5">{stat.label}</p>
              </div>
            </div>
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
              { label: 'Under 30 min', emoji: '⚡', bg: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:border-amber-400 hover:bg-amber-100', filter: 'fast' },
              { label: 'Rating 4.5+', emoji: '⭐', bg: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:border-orange-400 hover:bg-orange-100', filter: 'top' },
              { label: 'Great Offers', emoji: '🏷️', bg: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:border-blue-400 hover:bg-blue-100', filter: 'offers' },
              { label: 'New Arrivals', emoji: '🆕', bg: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:border-purple-400 hover:bg-purple-100', filter: 'new' },
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
              { icon: <Heart size={28} className="text-primary" />, title: '5M+ Happy Users', desc: 'Loved by millions across India for great food every day.' },
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
    </div>
  );
};

export default Home;
