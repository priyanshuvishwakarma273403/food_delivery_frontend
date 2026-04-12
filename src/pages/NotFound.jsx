import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <motion.div
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: 'spring', damping: 15 }}
           className="relative inline-block mb-12"
        >
           <h1 className="text-[180px] font-black text-primary/10 leading-none select-none">404</h1>
           <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/5903/5903939.png" 
                alt="Hungry 404" 
                className="h-40 animate-bounce"
              />
           </div>
        </motion.div>
        
        <h2 className="text-4xl font-black text-text-primary mb-4 italic">Lost in Food-land?</h2>
        <p className="text-text-secondary mb-12 text-lg leading-relaxed">
          The page you are looking for has been eaten or never existed. Let's get you back to something delicious!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link to="/">
              <Button className="px-8 py-4 rounded-2xl w-full sm:w-auto shadow-xl shadow-primary/20">
                 <Home size={18} className="mr-2" /> Back to Home
              </Button>
           </Link>
           <Link to="/restaurants">
              <Button variant="outline" className="px-8 py-4 rounded-2xl w-full sm:w-auto border-gray-200">
                 Explore Restaurants
              </Button>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
