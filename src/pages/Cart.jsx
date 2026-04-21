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
  Tag,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cartStore';
import { useWalletStore } from '../store/walletStore';
import CoinRedeemer from '../components/wallet/CoinRedeemer';
import Button from '../components/common/Button';
import { cn } from '../utils/cn';


const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalAmount } = useCartStore();
  const { coins, isApplyingCoins } = useWalletStore();

  const subtotal = getTotalAmount();
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const tax = Math.round(subtotal * 0.05); // 5% GST
  const intermediateTotal = subtotal + deliveryFee + tax;
  const discountAmount = isApplyingCoins ? Math.min(coins, intermediateTotal) : 0;
  const total = intermediateTotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 text-center pb-24 md:pb-24">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-md mx-auto"
        >
          <div className="h-32 w-32 md:h-48 md:w-48 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-inner">
            <ShoppingCart size={60} className="text-gray-200 md:w-20 md:h-20" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-text-primary mb-3 md:mb-4">Your Cart is Empty</h1>
          <p className="text-text-secondary text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
            Good food is always just a few clicks away. <br className="hidden md:block" />Go ahead, order from our menu!
          </p>
          <Link to="/restaurants">
            <Button className="px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-lg shadow-xl shadow-primary/20">
              Explore Restaurants
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 md:pb-10">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-100 sticky top-[56px] md:top-[72px] z-30">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/restaurants" className="md:hidden h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <ChevronLeft size={18} />
              </Link>
              <div>
                <h1 className="text-lg md:text-2xl font-black text-text-primary">Cart ({items.length})</h1>
                <p className="text-[10px] md:text-xs text-text-secondary font-medium hidden sm:block">Review your items and checkout</p>
              </div>
            </div>
            <button 
              onClick={clearCart}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors px-3 py-1.5 bg-red-50 rounded-lg"
            >
              <Trash2 size={12} /> Clear
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="space-y-3 md:space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-sm border border-gray-100 flex gap-3 md:gap-5 items-center"
                  >
                    {/* Image */}
                    <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="text-sm md:text-base font-bold text-text-primary truncate">{item.name}</h3>
                          <p className="text-[10px] md:text-xs text-text-secondary line-clamp-1 mt-0.5 hidden sm:block">
                            {item.description}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm md:text-base font-black text-primary">₹{item.price * item.quantity}</span>
                        
                        {/* Quantity Controls */}
                        <div className="bg-gray-50 rounded-lg flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-7 w-7 md:h-8 md:w-8 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 md:w-8 text-center font-black text-xs md:text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-7 w-7 md:h-8 md:w-8 flex items-center justify-center text-text-secondary hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Free delivery banner */}
            <div className="mt-4 md:mt-6 bg-blue-50/50 p-3 md:p-5 rounded-xl md:rounded-2xl border border-blue-100/50 flex items-center gap-3 md:gap-4">
              <div className="h-9 w-9 md:h-10 md:w-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                <Truck size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm font-bold text-blue-900">
                  {subtotal >= 500 ? '🎉 Free delivery applied!' : `Free delivery on ₹500+`}
                </p>
                {subtotal < 500 && (
                  <p className="text-[10px] md:text-xs text-blue-700/70">Add ₹{500 - subtotal} more to save ₹40</p>
                )}
              </div>
              <Link to="/restaurants">
                <Button variant="ghost" className="text-blue-600 hover:bg-white text-xs px-3 py-1.5 shrink-0 hidden sm:flex">Browse</Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 xl:w-96">
            <div className="sticky top-28 space-y-4 md:space-y-6">
              <CoinRedeemer cartTotal={intermediateTotal} />
              <div className="bg-white rounded-xl md:rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 md:p-6">
                  <h3 className="text-sm md:text-lg font-bold text-text-primary mb-4 md:mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-text-secondary font-medium">Item Total</span>
                      <span className="font-bold">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-text-secondary font-medium">Delivery Fee</span>
                      <span className={cn("font-bold", deliveryFee === 0 ? "text-green-500" : "")}>
                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-text-secondary font-medium">Taxes (5%)</span>
                      <span className="font-bold">₹{tax}</span>
                    </div>
                    
                    {isApplyingCoins && (
                      <div className="flex justify-between items-center text-xs md:text-sm text-green-600">
                        <span className="font-bold">Coins Discount</span>
                        <span className="font-bold">-₹{discountAmount}</span>
                      </div>
                    )}
                    
                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-sm md:text-lg font-black text-text-primary">Total</span>
                      <span className="text-lg md:text-2xl font-black text-primary">₹{total}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="relative mb-4 md:mb-6">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={14} />
                    <input 
                      type="text" 
                      placeholder="Promo code" 
                      className="w-full pl-9 pr-20 py-2.5 md:py-3 bg-gray-50 border border-transparent rounded-xl text-xs md:text-sm font-bold outline-none focus:ring-2 focus:ring-primary/10 transition-all uppercase placeholder:normal-case"
                    />
                    <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-white text-primary text-[10px] md:text-xs font-black rounded-lg border border-primary/20 hover:border-primary transition-all">APPLY</button>
                  </div>

                  {/* Checkout Button - hidden on mobile (shown in fixed bar below) */}
                  <div className="hidden md:block">
                    <Link to="/checkout">
                      <Button className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-base shadow-xl shadow-primary/20">
                        Proceed to Checkout <ArrowRight size={18} className="ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <ShieldCheck size={12} className="text-green-500" /> Secure Checkout
                  </div>
                  <div className="flex gap-3 grayscale opacity-50">
                    <img src="https://www.vectorlogo.zone/logos/visa/visa-icon.svg" className="h-3 md:h-4" alt="Visa" />
                    <img src="https://www.vectorlogo.zone/logos/mastercard/mastercard-icon.svg" className="h-3 md:h-4" alt="Mastercard" />
                    <img src="https://www.vectorlogo.zone/logos/upi/upi-icon.svg" className="h-3 md:h-4" alt="UPI" />
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-3 md:p-4 rounded-xl md:rounded-2xl border border-orange-100 flex gap-3">
                <AlertCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <p className="text-[10px] md:text-xs text-orange-800 leading-relaxed font-medium">
                  Tip: Avoid multiple restaurant orders to get your food delivered faster!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Fixed Bottom Checkout Bar */}
      <div className="md:hidden fixed bottom-[64px] left-0 right-0 z-40 bg-white border-t border-gray-100 px-4 py-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] text-text-secondary font-medium">Total Amount</p>
            <p className="text-lg font-black text-primary">₹{total}</p>
          </div>
          <Link to="/checkout" className="flex-1 max-w-[200px]">
            <Button className="w-full py-3 rounded-xl font-black text-sm shadow-lg shadow-primary/20">
              Checkout →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
