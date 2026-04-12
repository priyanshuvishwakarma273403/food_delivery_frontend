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
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { cn } from '../utils/cn';

// Dummy Restaurant Detail
const RESTAURANT = {
  id: 1,
  name: 'The Burger King',
  image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&q=80',
  cuisine: 'Burgers, American, Fast Food',
  rating: 4.5,
  deliveryTime: '25-30',
  minOrder: 150,
  address: 'Sector 62, Noida, Uttar Pradesh',
  menu: [
    {
      category: 'Recommended',
      items: [
        { id: 101, name: 'Whopper Burger', price: 199, description: 'Flame grilled beef patty with fresh lettuce, tomatoes, and mayo.', isVeg: false, isRecommended: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80' },
        { id: 102, name: 'Crispy Veg Burger', price: 129, description: 'Classic crispy potato patty burger with a touch of mint mayo.', isVeg: true, isRecommended: true, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&q=80' },
      ]
    },
    {
      category: 'Beef Burgers',
      items: [
        { id: 103, name: 'Double Whopper', price: 299, description: 'Two juicy flame grilled beef patties for the extra hunger.', isVeg: false, image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80' },
        { id: 104, name: 'Steakhouse Burger', price: 249, description: 'Premium steakhouse sauce with crispy onions and swiss cheese.', isVeg: false, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7d751?w=400&q=80' },
      ]
    },
    {
      category: 'Sides & Fries',
      items: [
        { id: 105, name: 'Large Peri Peri Fries', price: 120, description: 'Golden crispy fries tossed in hot peri peri spice.', isVeg: true, image: 'https://images.unsplash.com/photo-1630384066252-19e1ad95b4f6?w=400&q=80' },
        { id: 106, name: 'Cheesy Wedges', price: 140, description: 'Potato wedges topped with melted cheese sauce and herbs.', isVeg: true, image: 'https://images.unsplash.com/photo-1623238913973-21e45cced554?w=400&q=80' },
      ]
    }
  ]
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const [openCategories, setOpenCategories] = useState(['Recommended', 'Beef Burgers']);
  const { items, addItem, updateQuantity, getTotalAmount } = useCartStore();

  const toggleCategory = (cat) => {
    setOpenCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const getItemQuantity = (itemId) => {
    return items.find(i => i.id === itemId)?.quantity || 0;
  };

  const MenuItem = ({ item }) => (
    <div className="flex justify-between items-start py-8 border-b border-gray-100 last:border-0 group">
      <div className="flex-1 pr-8">
        <div className="flex items-center gap-2 mb-2">
           <div className={`h-4 w-4 border-2 flex items-center justify-center rounded-sm ${item.isVeg ? 'border-green-600' : 'border-red-600'}`}>
              <div className={`h-1.5 w-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`} />
           </div>
           {item.isRecommended && <Badge variant="warning" className="text-[10px] py-0">Best Seller</Badge>}
        </div>
        <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">{item.name}</h3>
        <p className="text-sm font-bold text-text-primary mt-1">₹{item.price}</p>
        <p className="text-sm text-text-secondary mt-3 leading-relaxed max-w-md line-clamp-2">{item.description}</p>
      </div>

      <div className="relative">
        <div className="h-28 w-28 md:h-32 md:w-32 rounded-2xl overflow-hidden shadow-premium">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          {getItemQuantity(item.id) > 0 ? (
            <div className="bg-white text-primary border border-primary/20 shadow-premium rounded-xl flex items-center overflow-hidden">
              <button 
                onClick={() => updateQuantity(item.id, getItemQuantity(item.id) - 1)}
                className="px-3 py-2 hover:bg-primary/5 transition-colors"
              >
                <Minus size={16} strokeWidth={3} />
              </button>
              <span className="px-3 font-black text-sm">{getItemQuantity(item.id)}</span>
              <button 
                onClick={() => addItem(item, RESTAURANT.id)}
                className="px-3 py-2 hover:bg-primary/5 transition-colors"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <Button 
              onClick={() => addItem(item, RESTAURANT.id)}
              className="bg-white text-primary border border-primary/20 hover:border-primary shadow-premium px-8 py-2.5 rounded-xl font-black uppercase text-xs"
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
      <div className="h-[400px] relative overflow-hidden">
        <img src={RESTAURANT.image} className="w-full h-full object-cover" alt={RESTAURANT.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <Link to="/restaurants" className="absolute top-8 left-8 h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
          <ArrowLeft size={20} />
        </Link>
        
        <div className="absolute bottom-12 left-0 right-0">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{RESTAURANT.name}</h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <span className="font-medium">{RESTAURANT.cuisine}</span>
              <div className="h-1 w-1 rounded-full bg-white/40" />
              <span className="flex items-center gap-2">
                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{RESTAURANT.rating} (500+ ratings)</span>
              </span>
              <div className="h-1 w-1 rounded-full bg-white/40" />
              <span className="flex items-center gap-2">
                <Clock size={18} />
                <span className="font-bold">{RESTAURANT.deliveryTime} mins</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Menu Sections */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-center justify-between border-b border-gray-100 pb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-text-primary">Menu</h2>
                <div className="relative">
                   <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                   <input 
                    type="text" 
                    placeholder="Search menu..." 
                    className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm w-64 outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
                   />
                </div>
              </div>
              <div className="flex items-center gap-4">
                   <Badge variant="gray" className="gap-2">Veg Only</Badge>
              </div>
            </div>

            {RESTAURANT.menu.map((section, idx) => (
              <div key={idx} className="scroll-mt-40">
                <button 
                  onClick={() => toggleCategory(section.category)}
                  className="flex items-center justify-between w-full mb-6 group"
                >
                  <h3 className="text-xl font-black text-text-primary flex items-center gap-3">
                    {section.category} ({section.items.length})
                  </h3>
                  <ChevronDown size={24} className={cn("text-gray-400 group-hover:text-primary transition-all", openCategories.includes(section.category) && "rotate-180")} />
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
                <div className="h-4 bg-gray-50/50 mt-8 rounded-full" />
              </div>
            ))}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-[2rem] shadow-premium border border-gray-100 p-8">
               <h3 className="text-2xl font-black text-text-primary mb-6 flex items-center gap-3">
                 Cart
                 <ShoppingCart size={24} className="text-primary" />
               </h3>
               
               {items.length > 0 ? (
                 <div className="space-y-6">
                   <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                     {items.map(item => (
                       <div key={item.id} className="flex items-center justify-between gap-4 mb-4">
                         <div className="flex-1">
                           <p className="text-sm font-bold text-text-primary">{item.name}</p>
                           <p className="text-xs text-text-secondary">₹{item.price}</p>
                         </div>
                         <div className="bg-white text-primary border border-primary/20 rounded-lg flex items-center overflow-hidden scale-90">
                           <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1"><Minus size={14} strokeWidth={3} /></button>
                           <span className="px-2 font-black text-xs">{item.quantity}</span>
                           <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1"><Plus size={14} strokeWidth={3} /></button>
                         </div>
                         <p className="text-sm font-bold text-text-primary w-16 text-right">₹{item.price * item.quantity}</p>
                       </div>
                     ))}
                   </div>
                   
                   <div className="pt-6 border-t border-gray-100 space-y-4">
                     <div className="flex justify-between items-center">
                       <span className="text-sm font-medium text-text-secondary">Subtotal</span>
                       <span className="font-bold">₹{getTotalAmount()}</span>
                     </div>
                     <div className="flex justify-between items-center text-primary">
                       <span className="text-sm font-medium">Extra charges may apply</span>
                       <Info size={14} />
                     </div>
                     <Link to="/checkout">
                       <Button className="w-full py-4 rounded-2xl text-base shadow-lg shadow-primary/20">
                         Checkout <ArrowLeft size={18} className="rotate-180 ml-2" />
                       </Button>
                     </Link>
                   </div>
                 </div>
               ) : (
                 <div className="py-12 text-center">
                   <div className="h-32 w-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingCart size={48} className="text-gray-200" />
                   </div>
                   <p className="text-text-secondary font-medium">Your cart is empty.</p>
                   <p className="text-xs text-gray-400 mt-1 px-4">Add some items from the menu to start your order!</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
