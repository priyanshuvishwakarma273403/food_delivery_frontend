import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, ArrowRight, TrendingUp, Flame, Star, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { CUISINE_CATEGORIES, getTopRatedRestaurants, getTotalFoodItems, getTotalRestaurants } from '../data/restaurants';
import Button from '../components/common/Button';
import StoryViewer from '../components/common/StoryViewer';
import MoodSearch from '../components/ai/MoodSearch';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const topRestaurants = getTopRatedRestaurants(8);
  const totalFoods = getTotalFoodItems();
  const totalRestaurants = getTotalRestaurants();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <div className="pb-10 md:pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80" 
            alt="Hero Background"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 py-10 md:py-0">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white mb-4 md:mb-6 leading-tight">
              Deliciousness <br />
              <span className="text-secondary italic">Delivered</span> to You.
            </h1>
            <p className="text-base md:text-xl text-gray-200 mb-6 md:mb-10 max-w-lg leading-relaxed">
              Order from <span className="text-secondary font-bold">{totalRestaurants}+</span> restaurants and <span className="text-secondary font-bold">{totalFoods}+</span> dishes. Fast, fresh, and reliable.
            </p>

            <form onSubmit={handleSearch} className="bg-white p-1.5 md:p-2 rounded-xl md:rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-1.5 md:gap-2 max-w-2xl mb-6 md:mb-8">
              <div className="flex-1 flex items-center gap-2 md:gap-3 px-3 md:px-4 border-b sm:border-b-0 sm:border-r border-gray-100 py-2">
                <MapPin className="text-primary shrink-0" size={18} />
                <input 
                  type="text" 
                  placeholder="Enter delivery area..." 
                  className="bg-transparent outline-none text-text-primary text-sm w-full font-medium min-w-0"
                />
                <button type="button" className="text-primary hover:bg-primary/10 p-1.5 md:p-2 rounded-lg transition-colors shrink-0">
                  <Navigation size={16} />
                </button>
              </div>
              <div className="flex-1 flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2">
                <Search className="text-gray-400 shrink-0" size={18} />
                <input 
                  type="text" 
                  placeholder="Search for food..." 
                  className="bg-transparent outline-none text-text-primary text-sm w-full font-medium min-w-0"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button type="submit" className="rounded-lg md:rounded-xl px-6 md:px-10 py-3 text-sm">Search</Button>
            </form>

            <MoodSearch />

          </motion.div>
        </div>
      </section>

      {/* Stories Component */}
      <section className="bg-white dark:bg-card-main py-4 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
          <p className="text-sm font-black text-text-primary mb-2 flex items-center gap-2">
            <Flame className="text-secondary" size={16} /> Latest Food Bites
          </p>
          <StoryViewer />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary">
        <div className="container mx-auto px-4 py-4 md:py-5 flex flex-wrap justify-center gap-4 md:gap-12">
          {[
            { value: `${totalRestaurants}+`, label: 'Restaurants', icon: <Flame size={16} /> },
            { value: `${totalFoods}+`, label: 'Dishes', icon: <Sparkles size={16} /> },
            { value: '30+', label: 'Cuisines', icon: <Star size={16} /> },
            { value: '10 min', label: 'Avg. Delivery', icon: <Clock size={16} /> },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 md:gap-3 text-white">
              <div className="bg-white/20 p-2 rounded-lg">{stat.icon}</div>
              <div>
                <p className="text-base md:text-xl font-black">{stat.value}</p>
                <p className="text-[10px] md:text-xs font-medium opacity-80">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cuisines Section */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#02060C] dark:text-white tracking-tighter">What's on your mind?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Explore our wide variety of cuisines</p>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 md:pb-8 scrollbar-hide gap-6 md:gap-12 -mx-4 px-4 snap-x snap-mandatory">
          {CUISINE_CATEGORIES.map((cuisine, index) => (
            <Link key={index} to={`/restaurants?cuisine=${cuisine.name}`}>
              <motion.div
                whileHover={{ scale: 1.08, translateY: -4 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 flex flex-col items-center gap-1 group cursor-pointer snap-start"
              >
                <div className="h-16 w-16 md:h-32 md:w-32 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 flex items-center justify-center text-3xl md:text-7xl group-hover:shadow-xl transition-all overflow-hidden mb-3">
                  <span>{cuisine.icon}</span>
                </div>
                <span className="font-bold text-sm md:text-lg text-[#02060C] dark:text-gray-100 group-hover:text-primary transition-colors text-center whitespace-nowrap leading-tight px-1">
                  {cuisine.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Restaurants */}
      <section className="bg-white dark:bg-black/40 py-10 md:py-20 overflow-hidden border-t border-gray-50 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={22} className="text-primary font-black" />
                <span className="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.2em] mb-1">Trending Now</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#02060C] dark:text-white tracking-tight">Top Rated Around You</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-2 hidden sm:block">Handpicked restaurants based on local favorites</p>
            </div>
            <Link to="/restaurants" className="group flex items-center gap-2 text-primary font-black hover:gap-3 transition-all text-sm md:text-base border-b-2 border-primary/10 pb-1">
              View All <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
            {topRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Categories */}
      <section className="container mx-auto px-4 py-10 md:py-20">
        <h2 className="text-2xl md:text-4xl font-extrabold text-black dark:text-white mb-8 md:mb-12">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
          {[
            { label: 'Pure Veg', emoji: '🥬', color: 'bg-green-50 dark:bg-green-900/40 border-green-300 dark:border-green-700 hover:bg-green-100', filter: 'veg' },
            { label: 'Under 30 min', emoji: '⚡', color: 'bg-yellow-50 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100', filter: 'fast' },
            { label: 'Rating 4.5+', emoji: '⭐', color: 'bg-orange-50 dark:bg-orange-900/40 border-orange-300 dark:border-orange-700 hover:bg-orange-100', filter: 'top' },
            { label: 'Great Offers', emoji: '🏷️', color: 'bg-blue-50 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 hover:bg-blue-100', filter: 'offers' },
            { label: 'New Arrivals', emoji: '🆕', color: 'bg-purple-50 dark:bg-purple-900/40 border-purple-300 dark:border-purple-700 hover:bg-purple-100', filter: 'new' },
          ].map((cat, i) => (
            <Link key={i} to={`/restaurants?filter=${cat.filter}`}>
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }} 
                className={`p-6 md:p-8 rounded-[2rem] border-2 ${cat.color} cursor-pointer transition-all group shadow-sm hover:shadow-md`}
              >
                <span className="text-3xl md:text-5xl">{cat.emoji}</span>
                <p className="text-sm md:text-base font-black mt-4 text-black dark:text-white group-hover:text-primary transition-colors uppercase tracking-tight">{cat.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
