import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Search, 
  Info,
  ChevronDown,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  Bike,
  MapPin,
  Users,
  Shield
} from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { getRestaurantById } from '../data/restaurants';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { cn } from '../utils/cn';

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = getRestaurantById(id);
  const [openCategories, setOpenCategories] = useState(
    restaurant?.menu?.map(s => s.category) || []
  );
  const [menuSearch, setMenuSearch] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const { items, addItem, updateQuantity, getTotalAmount } = useCartStore();

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🍽️</div>
        <h1 className="text-2xl font-black mb-2">Restaurant Not Found</h1>
        <p className="text-text-secondary mb-6">This restaurant doesn't exist or has been removed.</p>
        <Link to="/restaurants">
          <Button className="rounded-2xl px-8">Browse Restaurants</Button>
        </Link>
      </div>
    );
  }

  const toggleCategory = (cat) => {
    setOpenCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const getItemQuantity = (itemId) => {
    return items.find(i => i.id === itemId)?.quantity || 0;
  };

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Filter menu items
  const filteredMenu = restaurant.menu?.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (vegOnly && !item.isVeg) return false;
      if (menuSearch && !item.name.toLowerCase().includes(menuSearch.toLowerCase())) return false;
      return true;
    })
  })).filter(section => section.items.length > 0) || [];

  const MenuItem = ({ item }) => (
    <div className="flex justify-between items-start py-4 md:py-8 border-b border-gray-100 last:border-0 group">
      <div className="flex-1 pr-3 md:pr-8">
        <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
           <div className={`h-3.5 w-3.5 md:h-4 md:w-4 border-2 flex items-center justify-center rounded-sm ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
              <div className={`h-1 w-1 md:h-1.5 md:w-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
           </div>
           {item.isRecommended && <Badge variant="warning" className="text-[8px] md:text-[10px] py-0 px-1.5">Best Seller</Badge>}
        </div>
        <h3 className="text-sm md:text-lg font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
        <p className="text-xs md:text-sm font-bold text-text-primary mt-0.5 md:mt-1">₹{item.price}</p>
        <p className="text-[11px] md:text-sm text-text-secondary mt-1 md:mt-3 leading-relaxed max-w-md line-clamp-2 hidden sm:block">{item.description}</p>
      </div>

      <div className="relative shrink-0">
        <div className="h-20 w-20 md:h-32 md:w-32 rounded-xl md:rounded-2xl overflow-hidden shadow-premium">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
        </div>
        
        <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2">
          {getItemQuantity(item.id) > 0 ? (
            <div className="bg-white text-primary border border-primary/20 shadow-premium rounded-lg md:rounded-xl flex items-center overflow-hidden">
              <button 
                onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                className="px-2 md:px-3 py-1.5 md:py-2 hover:bg-primary/5 transition-colors"
              >
                <Minus size={12} strokeWidth={3} />
              </button>
              <span className="px-2 md:px-3 font-black text-xs md:text-sm">{getItemQuantity(item.id)}</span>
              <button 
                onClick={() => addItem(item, restaurant.id)}
                className="px-2 md:px-3 py-1.5 md:py-2 hover:bg-primary/5 transition-colors"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <Button 
              onClick={() => addItem(item, restaurant.id)}
              className="bg-white text-primary border border-primary/20 hover:border-primary shadow-premium px-4 md:px-8 py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-black uppercase text-[10px] md:text-xs whitespace-nowrap"
            >
              ADD
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="h-[200px] sm:h-[280px] md:h-[400px] relative overflow-hidden">
        <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <Link to="/restaurants" className="absolute top-4 md:top-8 left-4 md:left-8 h-8 w-8 md:h-10 md:w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
          <ArrowLeft size={18} />
        </Link>
        
        <div className="absolute bottom-4 md:bottom-12 left-0 right-0">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-2 md:mb-4">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-6 text-white/90 text-xs md:text-base">
              <span className="font-medium">{restaurant.cuisine}</span>
              <div className="h-1 w-1 rounded-full bg-white/40 hidden sm:block" />
              <span className="flex items-center gap-1 md:gap-2">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{restaurant.rating} ({restaurant.totalRatings?.toLocaleString()}+ ratings)</span>
              </span>
              <div className="h-1 w-1 rounded-full bg-white/40 hidden sm:block" />
              <span className="flex items-center gap-1 md:gap-2">
                <Clock size={14} />
                <span className="font-bold">{restaurant.deliveryTime} mins</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 md:py-4 flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm">
          {restaurant.offer && (
            <div className="flex items-center gap-1.5 text-secondary font-bold">
              <span className="text-sm md:text-base">🏷️</span> {restaurant.offer}
            </div>
          )}
          <div className="flex items-center gap-1.5 text-text-secondary">
            <MapPin size={14} className="text-primary" /> {restaurant.address}
          </div>
          {restaurant.costForTwo && (
            <div className="flex items-center gap-1.5 text-text-secondary">
              <Users size={14} className="text-primary" /> ₹{restaurant.costForTwo} for two
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-12">
        {/* Menu Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 md:pb-6 mb-4 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
            <h2 className="text-lg md:text-2xl font-black text-text-primary">Menu</h2>
            <div className="relative flex-1 sm:flex-initial">
               <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
               <input 
                type="text" 
                placeholder="Search menu..." 
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                className="pl-9 pr-3 py-2 bg-gray-50 border-none rounded-full text-xs md:text-sm w-full sm:w-56 md:w-64 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
               />
            </div>
          </div>
          <button 
            onClick={() => setVegOnly(!vegOnly)}
            className={cn(
              "flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border transition-all",
              vegOnly 
                ? "bg-green-500 border-green-500 text-white" 
                : "bg-white border-gray-200 text-text-secondary"
            )}
          >
            <div className={`h-3 w-3 border-2 rounded-sm flex items-center justify-center ${vegOnly ? 'border-white' : 'border-green-600'}`}>
              <div className={`h-1 w-1 rounded-full ${vegOnly ? 'bg-white' : 'bg-green-600'}`} />
            </div>
            Veg Only
          </button>
        </div>

        {/* Menu Sections */}
        <div className="space-y-4 md:space-y-12">
          {filteredMenu.map((section, idx) => (
            <div key={idx} className="scroll-mt-40">
              <button 
                onClick={() => toggleCategory(section.category)}
                className="flex items-center justify-between w-full mb-3 md:mb-6 group"
              >
                <h3 className="text-base md:text-xl font-black text-text-primary flex items-center gap-2 md:gap-3">
                  {section.category} ({section.items.length})
                </h3>
                <ChevronDown size={20} className={cn("text-gray-400 group-hover:text-primary transition-all", openCategories.includes(section.category) && "rotate-180")} />
              </button>
              
              <AnimatePresence initial={false}>
                {openCategories.includes(section.category) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="divide-y divide-gray-50">
                      {section.items.map(item => (
                        <MenuItem key={item.id} item={item} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="h-2 md:h-4 bg-gray-50/50 mt-3 md:mt-8 rounded-full" />
            </div>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No items found</h3>
            <p className="text-text-secondary text-sm">Try different search or filters</p>
          </div>
        )}
      </div>

      {/* Mobile Cart Bar */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
          <div className="bg-primary mx-3 mb-3 rounded-2xl shadow-2xl shadow-primary/30 p-3 flex items-center justify-between">
            <div className="text-white">
              <p className="text-xs font-bold">{cartItemCount} item{cartItemCount > 1 ? 's' : ''}</p>
              <p className="text-lg font-black">₹{getTotalAmount()}</p>
            </div>
            <Link to="/cart">
              <Button className="bg-white text-primary hover:bg-gray-100 rounded-xl px-6 py-2.5 font-black text-sm">
                View Cart →
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
