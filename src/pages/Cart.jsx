import { Link } from 'react-router-dom';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  ArrowRight, 
  AlertCircle,
  Truck,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalAmount } = useCartStore();

  const subtotal = getTotalAmount();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-md mx-auto"
        >
          <div className="h-48 w-48 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ShoppingCart size={80} className="text-gray-200" />
          </div>
          <h1 className="text-3xl font-black text-text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-text-secondary mb-10 leading-relaxed">
            Good food is always just a few clicks away. <br />Go ahead, order some yummy items from our menu!
          </p>
          <Link to="/restaurants">
            <Button className="px-10 py-4 rounded-2xl text-lg shadow-xl shadow-primary/20">
              Explore Restaurants
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 flex-1">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-text-primary">Shopping Cart ({items.length})</h1>
            <button 
              onClick={clearCart}
              className="text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-2 transition-colors"
            >
              <Trash2 size={16} /> Clear Cart
            </button>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2rem] p-6 shadow-premium border border-gray-100 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className="h-24 w-24 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                       <h3 className="text-lg font-bold text-text-primary">{item.name}</h3>
                       <Badge variant="success">Freshly Prepared</Badge>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-1 max-w-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                       <span className="font-black text-primary">₹{item.price}</span>
                       <span className="text-sm text-gray-300">|</span>
                       <span className="text-sm font-medium text-text-secondary">Subtotal: ₹{item.price * item.quantity}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="bg-gray-50 rounded-2xl flex items-center p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-10 w-10 flex items-center justify-center text-text-secondary hover:bg-white hover:text-primary rounded-xl transition-all shadow-sm"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-10 w-10 flex items-center justify-center text-text-secondary hover:bg-white hover:text-primary rounded-xl transition-all shadow-sm"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={24} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100/50 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
             <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                <Truck size={24} />
             </div>
             <div className="flex-1">
                <p className="text-sm font-bold text-blue-900">Free delivery on orders above ₹500!</p>
                <p className="text-xs text-blue-700/70">Add items worth ₹{Math.max(0, 500 - subtotal)} more to save ₹40.</p>
             </div>
             <Link to="/restaurants">
                <Button variant="ghost" className="text-blue-600 hover:bg-white">Browse Menu</Button>
             </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden">
               <div className="p-8">
                 <h3 className="text-xl font-bold text-text-primary mb-8">Order Summary</h3>
                 
                 <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-text-secondary font-medium">Item Total</span>
                     <span className="font-bold">₹{subtotal}</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-text-secondary font-medium">Delivery Fee</span>
                     <span className={cn("font-bold", deliveryFee === 0 ? "text-green-500" : "")}>
                       {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                     </span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                     <span className="text-text-secondary font-medium">Taxes & Charges (5%)</span>
                     <span className="font-bold">₹{tax}</span>
                   </div>
                   
                   <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                     <span className="text-lg font-black text-text-primary">Total Pay</span>
                     <span className="text-2xl font-black text-primary">₹{total}</span>
                   </div>
                 </div>

                 <div className="relative mb-8">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter promo code" 
                      className="w-full pl-12 pr-24 py-3.5 bg-gray-50 border border-transparent rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all uppercase placeholder:normal-case"
                    />
                    <button className="absolute right-2 top-2 bottom-2 px-4 bg-white text-primary text-xs font-black rounded-xl border border-primary/20 hover:border-primary transition-all">APPLY</button>
                 </div>

                 <Link to="/checkout" className="block">
                    <Button className="w-full py-4 rounded-2xl text-lg shadow-xl shadow-primary/20">
                      Proceed to Checkout <ArrowRight size={20} className="ml-2" />
                    </Button>
                 </Link>
               </div>
               
               <div className="bg-gray-50 p-6 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                     <ShieldCheck size={14} className="text-green-500" /> Secure Checkout
                  </div>
                  <div className="flex gap-4 grayscale opacity-50">
                     <img src="https://www.vectorlogo.zone/logos/visa/visa-icon.svg" className="h-4" />
                     <img src="https://www.vectorlogo.zone/logos/mastercard/mastercard-icon.svg" className="h-4" />
                     <img src="https://www.vectorlogo.zone/logos/upi/upi-icon.svg" className="h-4" />
                  </div>
               </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 flex gap-4">
               <AlertCircle size={20} className="text-orange-500 shrink-0" />
               <p className="text-xs text-orange-800 leading-relaxed font-medium">
                 Avoid multiple restaurant orders to get your food delivered faster and fresher!
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
