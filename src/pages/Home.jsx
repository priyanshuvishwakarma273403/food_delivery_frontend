import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, ArrowRight, TrendingUp, Flame, Star, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { CUISINE_CATEGORIES, getTopRatedRestaurants, getTotalFoodItems, getTotalRestaurants } from '../data/restaurants';
import Button from '../components/common/Button';

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

            {/* Mood Selector */}
            <div className="animate-in fade-in slide-in-from-left duration-1000 delay-300">
               <p className="text-white/60 text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 md:mb-4">How are you feeling today?</p>
               <div className="flex flex-wrap gap-2 md:gap-3">
                  {[
                    { label: 'Stressed', emoji: '😫', class: 'hover:bg-red-500 hover:border-red-500' },
                    { label: 'Happy', emoji: '🤩', class: 'hover:bg-yellow-500 hover:border-yellow-500' },
                    { label: 'Lazy', emoji: '😴', class: 'hover:bg-blue-500 hover:border-blue-500' },
                    { label: 'Healthy', emoji: '🥗', class: 'hover:bg-green-500 hover:border-green-500' },
                    { label: 'Adventurous', emoji: '🧭', class: 'hover:bg-purple-500 hover:border-purple-500' }
                  ].map((mood, idx) => (
                    <Link 
                      key={idx} 
                      to={`/restaurants?mood=${mood.label.toLowerCase()}`}
                      className={`px-3 md:px-5 py-2 md:py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs md:text-sm font-bold flex items-center gap-1.5 md:gap-2 transition-all duration-300 ${mood.class}`}
                    >
                      <span className="text-base md:text-lg">{mood.emoji}</span> {mood.label}
                    </Link>
                  ))}
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary -mt-1">
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
            <h2 className="text-xl md:text-3xl font-black text-text-primary">What's on your mind?</h2>
            <p className="text-text-secondary text-sm mt-1">Explore our wide variety of cuisines</p>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 md:pb-6 scrollbar-hide gap-4 md:gap-8 -mx-4 px-4 snap-x snap-mandatory">
          {CUISINE_CATEGORIES.map((cuisine, index) => (
            <Link key={index} to={`/restaurants?cuisine=${cuisine.name}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0 flex flex-col items-center gap-2 md:gap-3 group cursor-pointer snap-start"
              >
                <div className="h-16 w-16 md:h-24 md:w-24 rounded-full bg-white shadow-premium border border-gray-100 flex items-center justify-center text-2xl md:text-4xl group-hover:border-primary/30 transition-all overflow-hidden">
                  <span>{cuisine.icon}</span>
                </div>
                <span className="font-bold text-xs md:text-sm text-text-primary group-hover:text-primary transition-colors text-center whitespace-nowrap">{cuisine.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Restaurants */}
      <section className="bg-gray-50/50 py-8 md:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp size={20} className="text-primary" />
                <span className="text-xs font-black text-primary uppercase tracking-widest">Trending Now</span>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-text-primary">Top Rated Around You</h2>
              <p className="text-text-secondary text-sm mt-1 hidden sm:block">Handpicked restaurants based on {totalRestaurants}+ partners</p>
            </div>
            <Link to="/restaurants" className="group flex items-center gap-1 md:gap-2 text-primary font-bold hover:gap-2 md:hover:gap-3 transition-all text-sm md:text-base">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
            {topRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Categories */}
      <section className="container mx-auto px-4 py-8 md:py-16">
        <h2 className="text-xl md:text-3xl font-black text-text-primary mb-6 md:mb-10">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {[
            { label: 'Pure Veg', emoji: '🥬', color: 'bg-green-50 border-green-100 hover:border-green-300', filter: 'veg' },
            { label: 'Under 30 min', emoji: '⚡', color: 'bg-yellow-50 border-yellow-100 hover:border-yellow-300', filter: 'fast' },
            { label: 'Rating 4.5+', emoji: '⭐', color: 'bg-orange-50 border-orange-100 hover:border-orange-300', filter: 'top' },
            { label: 'Great Offers', emoji: '🏷️', color: 'bg-blue-50 border-blue-100 hover:border-blue-300', filter: 'offers' },
            { label: 'New Arrivals', emoji: '🆕', color: 'bg-purple-50 border-purple-100 hover:border-purple-300', filter: 'new' },
            { label: 'Budget Eats', emoji: '💰', color: 'bg-green-50 border-green-100 hover:border-green-300', filter: 'budget' },
            { label: 'Premium', emoji: '👑', color: 'bg-amber-50 border-amber-100 hover:border-amber-300', filter: 'premium' },
            { label: 'Late Night', emoji: '🌙', color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-300', filter: 'late' },
            { label: 'Bestsellers', emoji: '🔥', color: 'bg-red-50 border-red-100 hover:border-red-300', filter: 'best' },
            { label: 'Family Pack', emoji: '👨‍👩‍👧‍👦', color: 'bg-teal-50 border-teal-100 hover:border-teal-300', filter: 'family' },
          ].map((cat, i) => (
            <Link key={i} to={`/restaurants?filter=${cat.filter}`}>
              <motion.div 
                whileHover={{ y: -4 }} 
                className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border ${cat.color} cursor-pointer transition-all group`}
              >
                <span className="text-2xl md:text-3xl">{cat.emoji}</span>
                <p className="text-xs md:text-sm font-bold mt-2 md:mt-3 text-text-primary group-hover:text-primary transition-colors">{cat.label}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center">
        {[
          { title: 'No Minimum Order', desc: 'Order any amount you want', icon: '📦' },
          { title: 'Live Tracking', desc: 'Know where your food is at all times', icon: '📍' },
          { title: 'Super Fast Delivery', desc: 'Always on time, every time', icon: '⚡' }
        ].map((item, i) => (
          <div key={i} className="p-6 md:p-10 rounded-2xl md:rounded-3xl bg-white border border-gray-100 shadow-sm">
            <div className="text-3xl md:text-5xl mb-3 md:mb-6">{item.icon}</div>
            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
            <p className="text-text-secondary text-xs md:text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Download App Banner */}
      <section className="container mx-auto px-4 mt-8 md:mt-16">
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl md:rounded-[3rem] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 md:w-40 md:h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">Get the Tomato App</h2>
            <p className="text-white/80 text-sm md:text-base max-w-md">We will send you a link, open it on your phone to download the app.</p>
          </div>
          <div className="flex gap-3 md:gap-4 relative z-10">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10 md:h-12 cursor-pointer hover:scale-105 transition-transform" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10 md:h-12 cursor-pointer hover:scale-105 transition-transform" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
