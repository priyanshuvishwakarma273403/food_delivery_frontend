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
    offer,
    totalRatings,
    costForTwo
  } = restaurant;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden premium-shadow border border-gray-100"
    >
      <Link to={`/restaurants/${id}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Badges */}
          <div className="absolute top-2 md:top-4 left-2 md:left-4 flex flex-col gap-1 md:gap-2">
            {!isOpen && (
              <Badge variant="error" className="backdrop-blur-md bg-red-500/80 text-white text-[10px] md:text-xs px-1.5 md:px-2">Closed</Badge>
            )}
            {offer && (
              <Badge variant="warning" className="backdrop-blur-md bg-secondary/90 text-white font-bold text-[10px] md:text-xs px-1.5 md:px-2">{offer}</Badge>
            )}
          </div>

          {/* Delivery time badge */}
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
              <span className="text-[10px] md:text-xs font-black text-text-primary">{deliveryTime} min</span>
            </div>
          </div>

          {/* Name overlay on image */}
          <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-14 md:right-20 text-white">
            <h3 className="text-sm md:text-xl font-bold truncate leading-tight">{name}</h3>
            <p className="text-[10px] md:text-sm opacity-90 truncate font-medium hidden sm:block">{cuisine}</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 md:p-5">
          {/* Mobile: show cuisine below image */}
          <p className="text-[10px] md:hidden text-text-secondary truncate font-medium mb-2">{cuisine}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg bg-green-50 text-green-700">
              <Star size={10} fill="currentColor" className="md:w-3.5 md:h-3.5" />
              <span className="text-[10px] md:text-sm font-bold">{rating}</span>
              {totalRatings && (
                <span className="text-[8px] md:text-xs text-green-600 hidden sm:inline">
                  ({totalRatings > 1000 ? `${(totalRatings/1000).toFixed(0)}K+` : `${totalRatings}+`})
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-sm text-text-secondary font-medium">
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-primary hidden md:block" />
                <span>{deliveryTime} min</span>
              </div>
              {costForTwo && (
                <>
                  <div className="h-0.5 w-0.5 md:h-1 md:w-1 rounded-full bg-gray-300" />
                  <span>₹{costForTwo} for two</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard;
