import { motion } from 'framer-motion';
import { Search, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { CUISINES } from '../constants';
import Button from '../components/common/Button';

// Dummy data for top restaurants
const TOP_RESTAURANTS = [
  {
    id: 1,
    name: 'The Burger King',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80',
    cuisine: 'Burgers, American, Fast Food',
    rating: 4.5,
    deliveryTime: 25,
    minOrder: 150,
    isOpen: true,
    offer: '50% OFF up to ₹100'
  },
  {
    id: 2,
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    cuisine: 'North Indian, Mughlai, Biryani',
    rating: 4.2,
    deliveryTime: 35,
    minOrder: 250,
    isOpen: true,
    offer: 'Free Delivery'
  },
  {
    id: 3,
    name: 'Sushi Zen',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    cuisine: 'Japanese, Sushi, Seafood',
    rating: 4.8,
    deliveryTime: 45,
    minOrder: 500,
    isOpen: false,
    offer: '10% OFF'
  },
  {
    id: 4,
    name: 'Pizza Express',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    cuisine: 'Italian, Pizza, Pasta',
    rating: 4.4,
    deliveryTime: 20,
    minOrder: 300,
    isOpen: true,
    offer: 'Buy 1 Get 1 Free'
  }
];

const Home = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80" 
            alt="Hero Background"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Deliciousness <br />
              <span className="text-secondary italic">Delivered</span> to You.
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-lg leading-relaxed">
              Order from your favorite restaurants and track your food in real-time. Fast, fresh, and reliable.
            </p>

            <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl">
              <div className="flex-1 flex items-center gap-3 px-4 border-b md:border-b-0 md:border-r border-gray-100 py-2">
                <MapPin className="text-primary" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter delivery area..." 
                  className="bg-transparent outline-none text-text-primary text-sm w-full font-medium"
                />
                <button className="text-primary hover:bg-primary/10 p-2 rounded-lg transition-colors">
                  <Navigation size={18} />
                </button>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <Search className="text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for food..." 
                  className="bg-transparent outline-none text-text-primary text-sm w-full font-medium"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <Button className="rounded-xl px-10">Search</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cuisines Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-text-primary">What's on your mind?</h2>
            <p className="text-text-secondary mt-1">Explore our wide variety of cuisines</p>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-6 scrollbar-hide gap-8">
          {CUISINES.map((cuisine, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="h-24 w-24 rounded-full bg-white shadow-premium border border-gray-100 flex items-center justify-center text-4xl group-hover:border-primary/30 transition-all">
                {cuisine.icon}
              </div>
              <span className="font-bold text-text-primary group-hover:text-primary transition-colors">{cuisine.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Rated Restaurants */}
      <section className="container mx-auto px-4 bg-gray-50/50 py-16 -mx-4 px-4 overflow-hidden rounded-[4rem]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-text-primary">Top Rated Around You</h2>
            <p className="text-text-secondary mt-1">Handpicked restaurants for you</p>
          </div>
          <Link to="/restaurants" className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOP_RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { title: 'No Minimum Order', desc: 'Order any amount you want', icon: '📦' },
          { title: 'Live Tracking', desc: 'Know where your food is at all times', icon: '📍' },
          { title: 'Super Fast Delivery', desc: 'Always on time, every time', icon: '⚡' }
        ].map((item, i) => (
          <div key={i} className="p-10 rounded-3xl bg-white border border-gray-100 shadow-sm">
            <div className="text-5xl mb-6">{item.icon}</div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-text-secondary text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
