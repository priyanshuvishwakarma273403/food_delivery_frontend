import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const CartDrawer = () => {
  const { items, isDrawerOpen, toggleDrawer, updateQuantity, removeItem, getTotalAmount } = useCartStore();
  const navigate = useNavigate();

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
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-black text-lg text-text-primary dark:text-white">Your Cart</h3>
                  <p className="text-xs text-text-secondary">{items.length} items selected</p>
                </div>
              </div>
              <button 
                onClick={() => toggleDrawer(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-20 w-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="font-black text-xl text-text-primary dark:text-white">Cart is empty</h3>
                  <p className="text-sm text-text-secondary max-w-[200px]">Add some delicious items from restaurants near you!</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 group"
                  >
                    <div className="h-20 w-20 rounded-2xl overflow-hidden shrink-0 border border-gray-100 dark:border-gray-800">
                       <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-sm text-text-primary dark:text-white truncate">{item.name}</h4>
                       <p className="text-primary font-black text-sm mt-1">₹{item.price}</p>
                       
                       <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-1 rounded-lg">
                             <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors"
                             >
                                <Minus size={12} />
                             </button>
                             <span className="text-xs font-black min-w-[20px] text-center">{item.quantity}</span>
                             <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors"
                             >
                                <Plus size={12} />
                             </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-gray-100 dark:border-gray-800 space-y-6">
                <div className="flex items-center justify-between">
                   <span className="font-bold text-text-secondary">Subtotal</span>
                   <span className="text-2xl font-black text-text-primary dark:text-white">₹{getTotalAmount()}</span>
                </div>
                <Button 
                  onClick={() => { toggleDrawer(false); navigate('/checkout'); }}
                  className="w-full py-5 rounded-[2rem] text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                >
                  Checkout Now <ArrowRight size={20} />
                </Button>
                <p className="text-[10px] text-center text-text-secondary font-bold uppercase tracking-widest">
                   Free delivery on orders above ₹499
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
