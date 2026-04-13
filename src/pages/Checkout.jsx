import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, MapPin, CreditCard, Clock, 
  ChevronRight, Plus, Home, Briefcase,
  Smartphone, CheckCircle2, ArrowLeft, Truck,
  Leaf, TrendingUp, Coins, Crown
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useLocationStore } from '../store/locationStore';
import { useAuthStore } from '../store/authStore';
import { useWalletStore } from '../store/walletStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { toast } from 'react-hot-toast';
import ScratchCard from '../components/gamification/ScratchCard';

const steps = [
  { id: 1, name: 'Address', icon: MapPin },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: CheckCircle2 },
];

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isPlacing, setIsPlacing] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('asap');
  const [useCoins, setUseCoins] = useState(false);
  
  // Modals state
  const [wonCard, setWonCard] = useState(null);

  const { items, getTotalAmount, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { coins, deductCoins, addScratchCard } = useWalletStore();
  const { address: currentLoc } = useLocationStore();
  const navigate = useNavigate();

  const isPremium = user?.isPremium;
  const subtotal = getTotalAmount();
  
  // Calculate delivery fee
  const baseDelivery = 40;
  const deliveryFee = isPremium ? 0 : baseDelivery;
  
  const taxes = Math.round(subtotal * 0.05);
  
  // Calculate gamification discounts
  const coinDiscount = useCoins ? Math.min(coins, subtotal * 0.5) : 0; // Max 50% off via coins
  
  const total = subtotal + deliveryFee + taxes - coinDiscount;

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Deduct coins if used
      if (useCoins && coinDiscount > 0) {
        deductCoins(coinDiscount);
      }
      
      clearCart();
      
      // Generate a Scratch Card!
      const newCard = addScratchCard();
      setWonCard(newCard); // Show modal
      
    } catch (error) {
      toast.error('Failed to place order.');
      setIsPlacing(false);
    }
  };

  const handleScratchComplete = () => {
    setTimeout(() => {
      setWonCard(null);
      navigate('/orders/ORD' + Math.floor(Math.random() * 10000), { replace: true });
      toast.success('🎉 Order placed & Reward added!');
    }, 2000);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-6 md:mb-12">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center relative">
            <div className={`h-9 w-9 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
              currentStep >= step.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border border-gray-100'
            }`}>
              {currentStep > step.id ? <Check size={18} strokeWidth={3} /> : <step.icon size={16} />}
            </div>
            <span className={`absolute -bottom-5 md:-bottom-7 text-[9px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
              currentStep >= step.id ? 'text-text-primary' : 'text-gray-400'
            }`}>
              {step.name}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-10 md:w-20 h-0.5 md:h-1 mx-2 md:mx-4 rounded-full ${
              currentStep > step.id ? 'bg-primary' : 'bg-gray-100'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const AddressStep = () => (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {[
          { id: 1, type: 'Home', icon: Home, addr: 'H.No 123, Sector 62, Noida, UP' },
          { id: 2, type: 'Office', icon: Briefcase, addr: 'Cyber House, Phase 3, Gurgaon, HR' },
        ].map(addr => (
          <button
            key={addr.id}
            onClick={() => setSelectedAddress(addr.id)}
            className={`p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all group ${
              selectedAddress === addr.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-100 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className={`h-8 w-8 md:h-10 md:w-10 rounded-lg md:rounded-xl flex items-center justify-center ${selectedAddress === addr.id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                <addr.icon size={16} />
              </div>
              {selectedAddress === addr.id && <CheckCircle2 size={18} className="text-primary" />}
            </div>
            <h4 className="text-sm md:text-base font-bold text-text-primary mb-0.5">{addr.type}</h4>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{addr.addr}</p>
          </button>
        ))}
        <button className="p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-dashed border-gray-200 hover:border-primary/50 text-gray-400 hover:text-primary transition-all flex flex-col items-center justify-center gap-2 group">
          <Plus size={24} className="group-hover:scale-110 transition-transform" />
          <span className="font-bold text-xs md:text-sm">Add New Address</span>
        </button>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 md:p-6 mt-6">
         <h4 className="font-bold text-text-primary mb-3 flex items-center gap-2"><Clock size={18} className="text-orange-500" /> Schedule Delivery</h4>
         <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
               { id: 'asap', label: 'Fastest Delivery' },
               { id: '14:00', label: 'Today 2:00 PM' },
               { id: '19:00', label: 'Today 7:00 PM' },
               { id: 'tomorrow', label: 'Tomorrow 1:00 PM' }
            ].map(time => (
               <button 
                  key={time.id}
                  onClick={() => setScheduledTime(time.id)}
                  className={`shrink-0 px-4 py-2 rounded-xl border text-sm font-bold transition-all ${
                     scheduledTime === time.id ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-text-secondary border-orange-200 hover:border-orange-500'
                  }`}
               >
                  {time.label}
               </button>
            ))}
         </div>
      </div>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-3 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {coins > 0 && (
         <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-2xl flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-yellow-500 shadow-sm">
                  <Coins size={22} />
               </div>
               <div>
                  <h4 className="font-bold text-text-primary text-sm shadow-text uppercase">Tomato Wallet</h4>
                  <p className="text-xs text-text-secondary font-medium">Balance: {coins} Coins</p>
               </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
               <input 
                  type="checkbox" 
                  checked={useCoins} 
                  onChange={(e) => setUseCoins(e.target.checked)} 
                  className="w-5 h-5 accent-yellow-500 rounded"
               />
               <span className="text-sm font-bold text-text-primary uppercase">Use Coins</span>
            </label>
         </div>
      )}

      <div className="space-y-2 md:space-y-4">
        {[
          { id: 'upi', name: 'UPI (GPay/PhonePe)', icon: Smartphone, desc: 'Scan and Pay Instantly' },
          { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'All major cards supported' },
          { id: 'cod', name: 'Cash on Delivery', icon: Truck, desc: 'Pay when food arrives' },
        ].map(method => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`w-full p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all flex items-center gap-3 md:gap-5 ${
              paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-100 bg-white'
            }`}
          >
            <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-400'}`}>
              <method.icon size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm md:text-base font-bold text-text-primary">{method.name}</h4>
              <p className="text-[10px] md:text-xs text-text-secondary">{method.desc}</p>
            </div>
            {paymentMethod === method.id && <CheckCircle2 size={20} className="text-primary shrink-0" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {paymentMethod === 'upi' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <Input label="Enter UPI ID" placeholder="username@okaxis" />
          </motion.div>
        )}
        {paymentMethod === 'card' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="col-span-2"><Input label="Card Number" placeholder="0000 0000 0000 0000" /></div>
            <Input label="Expiry" placeholder="MM/YY" />
            <Input label="CVV" placeholder="***" type="password" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const ReviewStep = () => (
    <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-50/50 rounded-xl md:rounded-2xl p-4 md:p-6 space-y-3 md:space-y-4">
        <h4 className="font-bold text-sm md:text-base mb-2 md:mb-3">Order Summary</h4>
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-5 w-6 bg-white border border-gray-100 rounded text-[10px] font-black flex items-center justify-center">{item.quantity}x</span>
              <span className="text-xs md:text-sm font-medium text-text-primary truncate max-w-[180px] md:max-w-none">{item.name}</span>
            </div>
            <span className="text-xs md:text-sm font-black shrink-0 ml-2">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="pt-3 md:pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs md:text-sm text-text-secondary">Subtotal</span>
            <span className="text-xs md:text-sm font-bold">₹{subtotal}</span>
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs md:text-sm text-text-secondary">Delivery Fee</span>
            {isPremium ? (
               <span className="text-xs md:text-sm font-bold flex items-center gap-1 text-green-500">
                  <Crown size={14} /> FREE <span className="line-through text-gray-400 ml-1 text-xs">₹{baseDelivery}</span>
               </span>
            ) : (
               <span className="text-xs md:text-sm font-bold">₹{baseDelivery}</span>
            )}
          </div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs md:text-sm text-text-secondary">Taxes</span>
            <span className="text-xs md:text-sm font-bold">₹{taxes}</span>
          </div>
          {coinDiscount > 0 && (
            <div className="flex justify-between items-center mb-1 text-yellow-600">
              <span className="text-xs md:text-sm font-bold flex items-center gap-1"><Coins size={14} /> Coins Applied</span>
              <span className="text-xs md:text-sm font-black">-₹{coinDiscount}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-200 border-dashed">
            <span className="text-base md:text-xl font-black">Total to Pay</span>
            <span className="text-lg md:text-2xl font-black text-primary">₹{total}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Schedule</p>
          <p className="text-xs md:text-sm font-bold truncate">
             {scheduledTime === 'asap' ? 'ASAP (Fastest)' : scheduledTime}
          </p>
          {scheduledTime !== 'asap' && <Clock className="absolute top-2 right-2 text-orange-200" size={40} />}
        </div>
        <div className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Payment</p>
          <p className="text-xs md:text-sm font-bold uppercase">{paymentMethod}</p>
        </div>
      </div>
    </div>
  );

  if (wonCard) {
     return (
        <div className="min-h-screen bg-transparent fixed inset-0 z-[100] flex items-center justify-center p-4">
           {/* Dark backdrop */}
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
           
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="relative z-10 bg-white rounded-[3rem] p-8 md:p-12 text-center max-w-sm w-full flex flex-col items-center shadow-2xl"
           >
              <h2 className="text-3xl font-black text-text-primary mb-2">Order Confirmed!</h2>
              <p className="text-text-secondary font-medium mb-8">You won a scratch card for this order.</p>
              
              <ScratchCard card={wonCard} onScratchComplete={handleScratchComplete} />
              
              <p className="text-xs text-gray-400 mt-8 uppercase tracking-widest font-bold">Scratch to reveal reward</p>
           </motion.div>
        </div>
     );
  }

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-100 sticky top-[56px] md:top-[72px] z-30">
        <div className="container mx-auto px-4 py-3 md:py-4 max-w-4xl">
          <div className="flex items-center gap-3">
            <Link to="/cart" className="h-8 w-8 bg-gray-50 rounded-lg flex items-center justify-center md:hidden">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-base md:text-xl font-black text-text-primary">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 max-w-4xl">
        <StepIndicator />

        {/* Info Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8 mt-6 md:mt-0">
          <div className="bg-green-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg shadow-green-100 flex items-center gap-3 md:gap-4 relative overflow-hidden">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Leaf size={22} />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-black opacity-80 uppercase tracking-widest">Eco Impact</p>
              <p className="text-sm md:text-lg font-black">Saved 54g Plastic</p>
            </div>
          </div>
          
          {isPremium ? (
             <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg shadow-yellow-100 flex items-center justify-between overflow-hidden">
               <div className="flex items-center gap-3 md:gap-4">
                 <div className="h-10 w-10 md:h-12 md:w-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                   <Crown size={22} />
                 </div>
                 <div>
                   <p className="text-[9px] md:text-[10px] font-black opacity-80 uppercase tracking-widest">Gold Member</p>
                   <p className="text-sm md:text-lg font-black">Free Delivery Applied</p>
                 </div>
               </div>
             </div>
          ) : (
             <div className="bg-orange-500 text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg shadow-orange-100 flex items-center justify-between overflow-hidden">
               <div className="flex items-center gap-3 md:gap-4">
                 <div className="h-10 w-10 md:h-12 md:w-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                   <TrendingUp size={22} />
                 </div>
                 <div>
                   <p className="text-[9px] md:text-[10px] font-black opacity-80 uppercase tracking-widest">Peak Time</p>
                   <p className="text-sm md:text-lg font-black">High Demand</p>
                 </div>
               </div>
             </div>
          )}
        </div>
        
        <div className="bg-white rounded-xl md:rounded-[2.5rem] shadow-sm border border-gray-100 p-4 md:p-8 lg:p-12 relative overflow-hidden mb-12">
          <div className="absolute -top-10 -right-10 h-40 w-40 bg-primary/5 rounded-full blur-[60px] hidden md:block" />
          
          <div className="relative z-10">
            {currentStep === 1 && <AddressStep />}
            {currentStep === 2 && <PaymentStep />}
            {currentStep === 3 && <ReviewStep />}

            <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-gray-50 flex items-center justify-between gap-3">
              <button 
                onClick={prevStep}
                className={`flex items-center gap-1.5 text-xs md:text-sm font-bold transition-all ${
                  currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-primary'
                }`}
              >
                <ArrowLeft size={16} /> Back
              </button>
              
              <div className="flex-1 flex justify-end">
                {currentStep < 3 ? (
                  <Button onClick={nextStep} className="px-6 md:px-12 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm">
                    Next <ChevronRight size={18} />
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePlaceOrder} 
                    loading={isPlacing}
                    className="px-6 md:px-14 py-3 md:py-4 rounded-xl md:rounded-2xl bg-primary hover:bg-primary-dark shadow-xl shadow-primary/20 text-sm md:text-base"
                  >
                    Place Order ₹{total}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
