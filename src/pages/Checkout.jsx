import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  MapPin, 
  CreditCard, 
  ShoppingCart, 
  ChevronRight, 
  Plus,
  Home,
  Briefcase,
  Smartphone,
  CheckCircle2,
  ArrowLeft,
  Truck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useLocationStore } from '../store/locationStore';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { toast } from 'react-hot-toast';

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
  const { items, getTotalAmount, clearCart } = useCartStore();
  const { address: currentLoc } = useLocationStore();
  const navigate = useNavigate();

  const subtotal = getTotalAmount();
  const total = subtotal + 40 + Math.round(subtotal * 0.05);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders/ORD' + Math.floor(Math.random() * 10000), { replace: true });
    } catch (error) {
      toast.error('Failed to place order.');
    } finally {
      setIsPlacing(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-16">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center relative">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              currentStep >= step.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-400 border border-gray-100'
            }`}>
              {currentStep > step.id ? <Check size={24} strokeWidth={3} /> : <step.icon size={22} />}
            </div>
            <span className={`absolute -bottom-8 text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
              currentStep >= step.id ? 'text-text-primary' : 'text-gray-400'
            }`}>
              {step.name}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-20 h-1 mx-4 rounded-full ${
              currentStep > step.id ? 'bg-primary' : 'bg-gray-100'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const AddressStep = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 1, type: 'Home', icon: Home, addr: 'H.No 123, Sector 62, Noida, UP' },
          { id: 2, type: 'Office', icon: Briefcase, addr: 'Cyber House, Phase 3, Gurgaon, HR' },
        ].map(addr => (
          <button
            key={addr.id}
            onClick={() => setSelectedAddress(addr.id)}
            className={`p-6 rounded-3xl border-2 text-left transition-all group ${
              selectedAddress === addr.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-100 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
               <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${selectedAddress === addr.id ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
                 <addr.icon size={20} />
               </div>
               {selectedAddress === addr.id && <CheckCircle2 size={20} className="text-primary" />}
            </div>
            <h4 className="font-bold text-text-primary mb-1">{addr.type}</h4>
            <p className="text-sm text-text-secondary leading-relaxed">{addr.addr}</p>
          </button>
        ))}
        <button className="p-6 rounded-3xl border-2 border-dashed border-gray-200 hover:border-primary/50 text-gray-400 hover:text-primary transition-all flex flex-col items-center justify-center gap-2 group">
           <Plus size={32} className="group-hover:scale-110 transition-transform" />
           <span className="font-bold text-sm">Add New Address</span>
        </button>
      </div>

      <div className="h-64 rounded-3xl overflow-hidden bg-gray-100 relative group">
         <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" className="w-full h-full object-cover grayscale opacity-50" alt="Map Placeholder" />
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-premium border border-white/20">
               <span className="text-sm font-bold text-text-primary flex items-center gap-2 italic">
                 <MapPin className="text-primary" size={16} /> Leaflet.js Interactive Map
               </span>
            </div>
         </div>
         <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 border border-white/20">
            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
               <Navigation2 size={20} />
            </div>
            <div className="flex-1">
               <p className="text-[10px] font-black uppercase text-primary tracking-widest">Pin Location</p>
               <p className="text-sm font-bold truncate">Confirm your precise delivery spot</p>
            </div>
         </div>
      </div>
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        {[
          { id: 'upi', name: 'UPI (GPay/PhonePe)', icon: Smartphone, desc: 'Scan and Pay Instantly' },
          { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, desc: 'All major cards supported' },
          { id: 'cod', name: 'Cash on Delivery', icon: Truck, desc: 'Pay when food arrives' },
        ].map(method => (
          <button
            key={method.id}
            onClick={() => setPaymentMethod(method.id)}
            className={`w-full p-6 rounded-[2.5rem] border-2 text-left transition-all flex items-center gap-6 ${
              paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-50 hover:border-gray-100 bg-white'
            }`}
          >
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${paymentMethod === method.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-50 text-gray-400'}`}>
              <method.icon size={28} />
            </div>
            <div className="flex-1">
               <h4 className="font-bold text-text-primary mb-1">{method.name}</h4>
               <p className="text-xs text-text-secondary">{method.desc}</p>
            </div>
            {paymentMethod === method.id && <CheckCircle2 size={24} className="text-primary pr-2" />}
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="grid grid-cols-2 gap-4">
            <Input label="Card Number" placeholder="0000 0000 0000 0000" className="col-span-2" />
            <Input label="Expiry Date" placeholder="MM/YY" />
            <Input label="CVV" placeholder="***" type="password" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const ReviewStep = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gray-50/50 rounded-[2.5rem] p-8 space-y-6">
        <h4 className="font-bold text-lg mb-4 underline decoration-primary decoration-4 underline-offset-4">Order Summary</h4>
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="h-6 w-8 bg-white border border-gray-100 rounded text-xs font-black flex items-center justify-center">{item.quantity}x</span>
              <span className="text-sm font-medium text-text-primary">{item.name}</span>
            </div>
            <span className="text-sm font-black">₹{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="pt-6 border-t border-gray-200">
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm text-text-secondary">Subtotal</span>
             <span className="text-sm font-bold">₹{subtotal}</span>
           </div>
           <div className="flex justify-between items-center mb-2">
             <span className="text-sm text-text-secondary">Fees & Taxes</span>
             <span className="text-sm font-bold">₹{total - subtotal}</span>
           </div>
           <div className="flex justify-between items-center pt-4">
             <span className="text-xl font-black">Total to pay</span>
             <span className="text-2xl font-black text-primary">₹{total}</span>
           </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Delivery to</p>
            <p className="text-sm font-bold truncate">H.No 123, Sector 62, Noida...</p>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Payment via</p>
            <p className="text-sm font-bold uppercase">{paymentMethod}</p>
         </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <StepIndicator />

      <div className="bg-white rounded-[3.5rem] shadow-premium border border-gray-100 p-8 md:p-14 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute -top-10 -right-10 h-64 w-64 bg-primary/5 rounded-full blur-[80px]" />
        
        <div className="relative z-10">
          {currentStep === 1 && <AddressStep />}
          {currentStep === 2 && <PaymentStep />}
          {currentStep === 3 && <ReviewStep />}

          <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between gap-4">
            <button 
              onClick={prevStep}
              className={`flex items-center gap-2 text-sm font-bold transition-all ${
                currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-primary'
              }`}
            >
              <ArrowLeft size={18} /> Back
            </button>
            
            <div className="flex-1 flex justify-end">
              {currentStep < 3 ? (
                <Button onClick={nextStep} className="px-12 py-4 rounded-2xl">
                  Next Step <ChevronRight size={20} />
                </Button>
              ) : (
                <Button 
                  onClick={handlePlaceOrder} 
                  loading={isPlacing}
                  className="px-16 py-4 rounded-2xl bg-primary hover:bg-primary-dark shadow-xl shadow-primary/20 text-lg"
                >
                  Place Order ₹{total}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified icon since Navigation2 not available in standard lucide
const Navigation2 = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

export default Checkout;
