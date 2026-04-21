import { motion } from 'framer-motion';
import { Star, Clock, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getOptimizedImageUrl } from '../../utils/cloudinary';


const RestaurantCard = ({ restaurant }) => {
  const {
    id,
    name,
    image,
    imageUrl,
    cuisine,
    cuisineType,
    rating,
    deliveryTime,
    avgDeliveryTime,
    minOrder,
    minOrderAmount,
    isOpen,
    open,
    offer,
    totalRatings,
    costForTwo
  } = restaurant;

  // Sync field names between backend and mock data
  const displayImage = imageUrl || image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500';
  const displayCuisine = cuisineType || cuisine || 'Multi-cuisine';
  const displayDeliveryTime = avgDeliveryTime || deliveryTime || 30;
  const displayCostForTwo = costForTwo || minOrderAmount || minOrder || 250;
  
  // Logic to determine if open: check both 'open' (backend) and 'isOpen' (mock)
  // If both are undefined, default to true
  const isCurrentlyOpen = open !== undefined ? open : (isOpen !== undefined ? isOpen : true);



  const ratingColor = rating >= 4.0 ? 'bg-[#26A541]' : rating >= 3.5 ? 'bg-[#73C044]' : 'bg-[#F17D00]';

  return (
    <Link to={`/restaurants/${id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group card-zomato cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
          <img 
            src={getOptimizedImageUrl(displayImage, { width: 500, height: 300 })} 
            alt={name}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80';
              e.target.onerror = null;
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          
          {/* Closed Overlay */}
          {!isCurrentlyOpen && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-t-2xl">
              <span className="bg-gray-800 text-white text-xs font-black px-3 py-1.5 rounded-full">Currently Closed</span>
            </div>
          )}

          {/* Offer Badge */}
          {offer && isCurrentlyOpen && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-white text-primary text-[11px] font-black px-2.5 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
                <Percent size={11} strokeWidth={3} />
                {offer}
              </div>
            </div>
          )}

          {/* Delivery time */}
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm text-[#1C1C1C] text-[11px] font-black px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
              <Clock size={11} strokeWidth={2.5} />
              {displayDeliveryTime || 30} min
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 md:p-4">
          <h3 className="font-black text-[#1C1C1C] text-sm md:text-base truncate leading-tight mb-0.5 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-[#686B78] text-[11px] md:text-xs truncate font-medium mb-2.5">
            {displayCuisine || 'Cuisine'}
          </p>

          {/* Rating & Info Row */}
          <div className="flex items-center gap-2 pt-2.5 border-t border-[#F0F0F0]">
            {/* Rating Badge */}
            <div className={`flex items-center gap-1 ${ratingColor} text-white px-1.5 py-0.5 rounded-md`}>
              <Star size={10} fill="white" strokeWidth={0} />
              <span className="text-[11px] font-black">{rating || '4.0'}</span>
            </div>
            
            <span className="text-[#D4D5D9] text-xs">•</span>
            
            {(totalRatings || 100) && (
              <span className="text-[#686B78] text-[10px] md:text-xs font-medium">
                {(totalRatings || 100) > 1000 ? `${((totalRatings || 100)/1000).toFixed(1)}k+` : `${(totalRatings || 100)}+`} ratings
              </span>
            )}
            
            {displayCostForTwo && (
              <>
                <span className="text-[#D4D5D9] text-xs">•</span>
                <span className="text-[#686B78] text-[10px] md:text-xs font-medium">₹{displayCostForTwo} for two</span>
              </>
            )}
          </div>

        </div>
      </motion.div>
    </Link>
  );
};

export default RestaurantCard;
