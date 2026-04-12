import { motion } from 'framer-motion';
import { Star, Clock, Bike } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../common/Badge';

const RestaurantCard = ({ restaurant }) => {
  const {
    id,
    name,
    image,
    cuisine,
    rating,
    deliveryTime,
    minOrder,
    isOpen,
    offer
  } = restaurant;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden premium-shadow border border-gray-100"
    >
      <Link to={`/restaurants/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {!isOpen && (
              <Badge variant="error" className="backdrop-blur-md bg-red-500/80 text-white">Closed Now</Badge>
            )}
            {offer && (
              <Badge variant="warning" className="backdrop-blur-md bg-secondary/90 text-white font-bold">{offer}</Badge>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-xl font-bold truncate leading-tight">{name}</h3>
            <p className="text-sm opacity-90 truncate font-medium">{cuisine}</p>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-green-50 text-green-700">
              <Star size={14} fill="currentColor" />
              <span className="text-sm font-bold">{rating}</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-text-secondary font-medium">
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-primary" />
                <span>{deliveryTime} min</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <Bike size={16} className="text-primary" />
                <span>₹{minOrder} min</span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">Quick Delivery</span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
