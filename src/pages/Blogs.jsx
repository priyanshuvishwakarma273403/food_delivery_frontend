import { motion } from 'framer-motion';
import { useBlogStore } from '../store/blogStore';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import dayjs from 'dayjs';

const Blogs = () => {
  const { blogs } = useBlogStore();

  return (
    <div className="min-h-screen pb-20 pt-16 md:pt-24 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4">Tomato <span className="text-primary italic">Bites</span></h1>
          <p className="text-text-secondary text-lg">Daily dose of food stories, festive offers, and health tips.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all group flex flex-col h-full"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-4 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-primary" /> {dayjs(blog.date).format('MMM DD, YYYY')}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-primary" /> {blog.author}
                  </div>
                </div>

                <h2 className="text-2xl font-black text-text-primary mb-4 leading-tight group-hover:text-primary transition-colors">
                  {blog.title}
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6 line-clamp-3 font-medium">
                  {blog.content}
                </p>

                <button className="mt-auto flex items-center gap-2 text-primary font-black group/btn">
                  Read More <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
