import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { cn } from '../../utils/cn';
import { getOptimizedImageUrl } from '../../utils/cloudinary';

const CartDrawer = () => {
  const { items, isDrawerOpen, toggleDrawer, updateQuantity, removeItem, getTotalAmount } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getTotalAmount();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => toggleDrawer(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-card-main z-[120] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 md:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-card-main sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shadow-sm">
                  <ShoppingBag size={22} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-black text-xl text-[#1C1C1C] dark:text-white tracking-tight">My Cart</h3>
                  <p className="text-[11px] font-bold text-[#686B78] uppercase tracking-widest">{items.length} items</p>
                </div>
              </div>
              <button 
                onClick={() => toggleDrawer(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all hover:rotate-90"
              >
                <X size={24} className="text-[#1C1C1C] dark:text-white" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50/50 dark:bg-black/20">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="h-32 w-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-100 shadow-inner mb-6">
                    <ShoppingBag size={64} strokeWidth={1} />
                  </div>
                  <h3 className="font-black text-2xl text-[#1C1C1C] dark:text-white mb-2">Empty Cart?</h3>
                  <p className="text-sm text-[#686B78] max-w-[240px] leading-relaxed font-medium">Your belly is calling! Add some delicious dishes to your cart now.</p>
                  <Button 
                    variant="outline" 
                    className="mt-8 rounded-full px-8"
                    onClick={() => { toggleDrawer(false); navigate('/restaurants'); }}
                  >
                    Go Exploring
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 group"
                  >
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-50 dark:border-gray-700">
                       <img 
                         src={getOptimizedImageUrl(item.imageUrl || item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300')} 
                         alt={item.name} 
                         className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                         onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300';
                            e.target.onerror = null;
                         }}
                       />
                    </div>
                    <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                       <div>
                          <div className="flex items-start justify-between gap-2">
                             <h4 className="font-black text-sm md:text-base text-[#1C1C1C] dark:text-white leading-tight truncate">
                                {item.name}
                             </h4>
                             <button 
                               onClick={() => removeItem(item.id)}
                               className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                             >
                               <Trash2 size={16} />
                             </button>
                          </div>
                          <p className="text-primary font-black text-base mt-1.5">₹{item.price}</p>
                       </div>
                       
                       <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-800">
                             <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="text-gray-400 hover:text-primary transition-colors"
                             >
                                <Minus size={14} strokeWidth={3} />
                             </button>
                             <span className="text-sm font-black min-w-[16px] text-center text-[#1C1C1C] dark:text-white">{item.quantity}</span>
                             <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="text-gray-400 hover:text-primary transition-colors"
                             >
                                <Plus size={14} strokeWidth={3} />
                             </button>
                          </div>
                          <span className="text-xs font-bold text-[#686B78] uppercase tracking-tighter">
                             Total: <span className="text-[#1C1C1C] dark:text-white font-black">₹{item.price * item.quantity}</span>
                          </span>
                       </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 md:p-8 bg-white dark:bg-card-main border-t border-gray-100 dark:border-gray-800 space-y-6 shadow-[0_-8px_24px_rgba(0,0,0,0.05)]">
                <div className="space-y-3">
                   <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-[#686B78]">Item Total</span>
                      <span className="font-bold text-[#1C1C1C] dark:text-white">₹{subtotal}</span>
                   </div>
                   <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-[#686B78]">Delivery Partner Fee</span>
                      <span className={cn("font-bold", deliveryFee === 0 ? "text-green-500" : "text-[#1C1C1C] dark:text-white")}>
                         {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                   </div>
                   <div className="h-px bg-gray-100 dark:bg-gray-800 my-2" />
                   <div className="flex items-center justify-between">
                      <span className="font-black text-lg text-[#1C1C1C] dark:text-white">Total Amount</span>
                      <span className="text-2xl font-black text-primary">₹{total}</span>
                   </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => { toggleDrawer(false); navigate('/checkout'); }}
                    className="w-full py-5 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
                  >
                    Proceed to Checkout 
                    <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#686B78] font-bold uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-green-500" />
                     100% Safe & Secure Checkout
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

