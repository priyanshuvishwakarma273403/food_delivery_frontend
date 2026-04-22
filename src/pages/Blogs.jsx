import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBlogStore } from '../store/blogStore';
import { Calendar, User, Tag, ArrowRight, Clock, Share2, Heart } from 'lucide-react';
import dayjs from 'dayjs';
import { RestaurantSkeleton } from '../components/common/Skeleton';

const Blogs = () => {
  const { blogs, fetchBlogs, isLoading } = useBlogStore();

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen pb-24 pt-16 md:pt-24 bg-[#F8F9FB]">
      <div className="container mx-auto px-4 lg:max-w-7xl">
        
        {/* Hero Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Clock size={14} /> Daily Stories & Updates
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-[#1C1C1C] mb-6 leading-tight">
            Tomato <span className="text-primary italic">Bites</span>
          </h1>
          <p className="text-[#686B78] text-lg font-medium leading-relaxed">
            Exploring the world of flavors, one story at a time. Discover festive offers, health tips, and local food secrets.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <RestaurantSkeleton key={i} />)}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {blogs.map((blog, idx) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={blog.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-[#1C1C1C] text-[10px] font-black px-4 py-2 rounded-xl shadow-sm uppercase tracking-widest">
                      {blog.category || 'Foodie'}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex gap-2">
                       <button className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all">
                          <Heart size={20} />
                       </button>
                       <button className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                          <Share2 size={20} />
                       </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] text-[#686B78] mb-4 font-black uppercase tracking-[0.15em]">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" /> {dayjs(blog.date || blog.createdAt).format('MMM DD, YYYY')}
                    </div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-primary" /> {blog.author || 'Tomato Team'}
                    </div>
                  </div>

                  <h2 className="text-2xl font-black text-[#1C1C1C] mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-[#686B78] leading-relaxed mb-8 line-clamp-3 font-medium text-sm">
                    {blog.content}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <button className="flex items-center gap-2 text-primary font-black text-sm group/btn">
                      Read Story <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                    <span className="text-[10px] font-black text-gray-300 uppercase">5 min read</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <Tag size={64} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-2xl font-black text-[#1C1C1C] mb-2">No Stories Shared Yet</h3>
            <p className="text-[#686B78] font-medium mb-8">Admin is currently cooking up some great content for you!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;

