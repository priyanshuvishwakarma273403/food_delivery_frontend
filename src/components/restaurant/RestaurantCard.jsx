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

  // Create a diverse set of high-quality food images
  const fallbackImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Salad/Healthy
    'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445', // Pancakes/Sweets
    'https://images.unsplash.com/photo-1513104890138-7c749659a591', // Pizza
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', // Burger
    'https://images.unsplash.com/photo-1603360946369-dc9bb6258143', // Indian Thali
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0', // Biryani (Chicken)
    'https://images.unsplash.com/photo-1603894544376-3b5265744f8b', // Mutton Curry
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', // Fish Fry
    'https://images.unsplash.com/photo-1525351484163-7529414344d8', // Egg Benedict/Omelette
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1', // Grilled Chicken
    'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e', // Chinese Noodles
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd', // Healthy Veg Bowl
    'https://images.unsplash.com/photo-1601050690597-df056fb47091', // Samosa/Indian Snacks
    'https://images.unsplash.com/photo-1585032226651-759b368d7246', // Stir Fry
    'https://images.unsplash.com/photo-1534422298391-e4f8c170db0f', // Dumplings/Momos
  ];
  
  // Better deterministic index using a simple hash of the name
  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };
  
  const imageIndex = name ? getHash(name) % fallbackImages.length : 0;
  const uniqueFallback = `${fallbackImages[imageIndex]}?w=600&q=80&auto=format&fit=crop`;

  // Sync field names between backend and mock data
  const displayImage = imageUrl || image || uniqueFallback;
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
        whileHover={{ 
          y: -8, 
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.15)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group bg-white rounded-3xl overflow-hidden border border-[#F0F0F0] hover:border-primary/20 transition-all duration-300 cursor-pointer relative"
      >
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={getOptimizedImageUrl(displayImage, { width: 500, height: 320 })} 
            alt={name}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80';
              e.target.onerror = null;
            }}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
            loading="lazy"
          />

          {/* Quick Add Overlay Button */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <div className="quick-add-btn bg-white text-[#1C1C1C] font-black px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2 hover:bg-primary hover:text-white transition-all scale-90 group-hover:scale-100">
              Quick View
            </div>
          </div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-20">
            {/* Bestseller Shine Badge */}
            {rating >= 4.3 && (
              <div className="animate-shine bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black px-2.5 py-1 rounded-lg shadow-lg uppercase tracking-wider">
                Bestseller
              </div>
            )}
            
            {/* Delivery time */}
            <div className="bg-white/90 backdrop-blur-md text-[#1C1C1C] text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 ml-auto">
              <Clock size={12} strokeWidth={3} className="text-primary" />
              {displayDeliveryTime || 30} min
            </div>
          </div>

          {/* Bottom Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          {/* Closed Overlay */}
          {!isCurrentlyOpen && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-30">
              <span className="bg-gray-900 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">Currently Closed</span>
            </div>
          )}

          {/* Offer Badge Overlay on Image */}
          {offer && isCurrentlyOpen && (
            <div className="absolute bottom-3 left-3 z-20">
              <div className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5 border border-white/20">
                <Percent size={12} strokeWidth={3} />
                {offer}
              </div>
            </div>
          )}
        </div>

        {/* Info Area */}
        <div className="p-4 md:p-5">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-black text-[#1C1C1C] text-base md:text-lg truncate leading-tight group-hover:text-primary transition-colors pr-2 flex-1">
              {name}
            </h3>
            {/* Rating Badge */}
            <div className={`flex items-center gap-1 ${ratingColor} text-white px-2 py-0.5 rounded-lg shadow-sm shrink-0`}>
              <span className="text-[11px] md:text-xs font-black">
                {rating ? Number(rating).toFixed(1) : '4.0'}
              </span>
              <Star size={10} fill="white" strokeWidth={0} />
            </div>
          </div>

          <div className="flex items-center justify-between text-[#686B78] mb-3">
             <p className="text-[11px] md:text-xs truncate font-bold opacity-80">
               {displayCuisine || 'Multi-cuisine'}
             </p>
             {displayCostForTwo && (
               <p className="text-[10px] md:text-xs font-bold whitespace-nowrap">
                 ₹{displayCostForTwo} for two
               </p>
             )}
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-dashed border-gray-200">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${name}${i}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
             </div>
             <p className="text-[10px] text-gray-400 font-bold">Ordered recently by {Math.floor(Math.random() * 100) + 50}+</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RestaurantCard;
