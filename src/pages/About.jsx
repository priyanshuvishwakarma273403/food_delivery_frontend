import { motion } from 'framer-motion';
import { Target, Heart, Award, Shield, Users, TrendingUp } from 'lucide-react';
import Badge from '../components/common/Badge';

const About = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80" 
          alt="About Us Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Badge variant="warning" className="mb-4">Our Story</Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-4">Driving the Future of Food</h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
                We are India's #1 food delivery platform, connecting hungry people with the best restaurants in their city.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-24">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-6">Our Mission</h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Founded in 2023, Tomato started with a simple belief: everyone deserves access to great food, delivered fast and fresh. What began as a small operation with hand-picked local eateries has blossomed into a nationwide phenomenon.
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              We empower local businesses, create earning opportunities for thousands of delivery partners, and ensure our customers never have to compromise on taste or convenience.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 p-6 rounded-[2rem] text-center border border-primary/10">
              <Users size={32} className="text-primary mx-auto mb-3" />
              <h3 className="text-3xl font-black text-text-primary mb-1">50M+</h3>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Happy Users</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-[2rem] text-center border border-orange-100 mt-8">
              <TrendingUp size={32} className="text-orange-500 mx-auto mb-3" />
              <h3 className="text-3xl font-black text-text-primary mb-1">100+</h3>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Cities</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">Core Values</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Everything we do is guided by these principles to ensure the best experience for our ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Heart, title: 'Customer First', desc: 'Every decision we make starts with how it impacts our users.' },
            { icon: Shield, title: 'Quality & Safety', desc: 'Uncompromising standards for hygiene and delivery safety.' },
            { icon: Award, title: 'Partner Success', desc: 'Helping local restaurants grow their digital presence.' }
          ].map((val, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 hover:border-primary/20 transition-colors"
            >
              <div className="h-14 w-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-primary mb-6">
                <val.icon size={28} />
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">{val.title}</h3>
              <p className="text-text-secondary leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
