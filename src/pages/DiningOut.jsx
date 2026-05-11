import { motion } from 'framer-motion';
import { Search, MapPin, Star, Clock, Filter, ArrowRight, Utensils, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiningOut = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1800&q=80" 
            className="w-full h-full object-cover" 
            alt="Dining Out"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <span className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">
              Premium Dining
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Book the best tables <br /> in your city
            </h1>
            
            <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-xl">
              <div className="flex items-center gap-3 px-4 py-3 flex-1 border-r border-gray-100">
                <MapPin className="text-blue-600" size={20} />
                <input type="text" placeholder="Mumbai, India" className="outline-none font-bold text-sm w-full" />
              </div>
              <button className="bg-blue-600 text-white font-black px-8 py-3 rounded-xl text-sm uppercase tracking-widest hover:bg-blue-700 transition-colors">
                Explore
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Star className="text-amber-500" />, title: 'Top Rated', desc: 'Curated list of 5-star restaurants' },
              { icon: <Zap className="text-blue-600" />, title: 'Instant Booking', desc: 'Confirm your table in seconds' },
              { icon: <Users className="text-purple-600" />, title: 'Group Dining', desc: 'Special arrangements for big groups' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
              >
                <div className="h-12 w-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-[#1C1C1C] mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Section ── */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-[#1C1C1C]">Trending this week</h2>
              <p className="text-gray-400 font-medium">The most booked restaurants in Mumbai</p>
            </div>
            <button className="text-blue-600 font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              View All <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             {[1,2,3,4].map(i => (
               <motion.div key={i} whileHover={{ y: -10 }} className="group">
                  <div className="relative h-64 rounded-[2rem] overflow-hidden mb-4 shadow-xl">
                    <img 
                      src={`https://images.unsplash.com/photo-${1517248135467 + i}?w=600&q=80`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt="Restaurant"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} fill="#F59E0B" className="text-amber-500" />
                      <span className="text-xs font-black text-[#1C1C1C]">4.5</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-[#1C1C1C]">The Royal Feast</h4>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Italian • Fine Dining • ₹2,500 for two</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiningOut;
