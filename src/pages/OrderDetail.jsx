import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Bike, 
  ArrowLeft,
  Package,
  Soup,
  CheckCircle2,
  AlertCircle,
  Star
} from 'lucide-react';
import LiveMap from '../components/order/LiveMap';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const STEPS = [
  { id: 1, name: 'Placed', icon: CheckCircle2, status: 'ORDER_PLACED' },
  { id: 2, name: 'Confirmed', icon: Check, status: 'CONFIRMED' },
  { id: 3, name: 'Preparing', icon: Soup, status: 'PREPARING' },
  { id: 4, name: 'On its way', icon: Bike, status: 'OUT_FOR_DELIVERY' },
  { id: 5, name: 'Delivered', icon: Package, status: 'DELIVERED' },
];

const OrderDetail = () => {
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(4);
  const [riderPos, setRiderPos] = useState([28.6139, 77.2090]);
  const [eta, setEta] = useState(12);

  // Positions
  const restaurantPos = [28.6239, 77.2290];
  const userPos = [28.6039, 77.1890];

  // Simulate rider movement
  useEffect(() => {
    const interval = setInterval(() => {
      setRiderPos(prev => [
        prev[0] - 0.0001,
        prev[1] - 0.0001
      ]);
      setEta(prev => Math.max(1, prev - 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <Link to="/orders" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors font-bold mb-8">
        <ArrowLeft size={18} /> Back to My Orders
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Tracking Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-premium border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-bl-full" />
            
            <Badge variant="warning" className="mb-4">Order {id}</Badge>
            <h1 className="text-3xl font-black text-text-primary mb-2">Estimated Arrival</h1>
            <div className="flex items-center gap-3 text-primary mb-10">
               <Clock size={32} strokeWidth={3} className="animate-pulse" />
               <span className="text-5xl font-black">{eta} Mins</span>
            </div>

            {/* Stepper */}
            <div className="relative space-y-8 ml-4">
              <div className="absolute left-[-16px] top-6 bottom-6 w-0.5 bg-gray-100" />
              {STEPS.map((step) => (
                <div key={step.id} className="relative flex items-center gap-6">
                  <div className={`z-10 h-8 w-8 rounded-full flex items-center justify-center border-4 border-white transition-all duration-500 ${
                    currentStep >= step.id ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep > step.id ? <Check size={14} strokeWidth={4} /> : <step.icon size={14} />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-sm font-black uppercase tracking-wider ${currentStep >= step.id ? 'text-text-primary' : 'text-gray-400'}`}>
                      {step.name}
                    </span>
                    {currentStep === step.id && (
                      <span className="text-xs text-primary font-bold animate-pulse">In Progress...</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-100">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                  <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80" alt="Rider" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                   <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Your Delivery Partner</p>
                   <h4 className="text-lg font-black text-text-primary">Rahul Sharma</h4>
                   <div className="flex items-center gap-1.5 text-orange-500 text-xs font-bold">
                      <Star size={12} fill="currentColor" /> 4.9 Rating
                   </div>
                </div>
                <button className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                   <Phone size={20} />
                </button>
             </div>
             
             <div className="p-4 bg-gray-50 rounded-2xl flex gap-3">
                <AlertCircle size={18} className="text-orange-500 shrink-0" />
                <p className="text-[10px] text-text-secondary leading-tight uppercase font-black">
                  Tip: Rahul is wearing a mask and following all safety protocols for a contactless delivery.
                </p>
             </div>
          </div>
        </div>

        {/* Live Map */}
        <div className="lg:col-span-8">
           <div className="h-[600px] lg:h-full min-h-[500px] rounded-[4rem] overflow-hidden shadow-premium border-8 border-white bg-gray-100 relative">
              <LiveMap 
                riderPos={riderPos}
                restaurantPos={restaurantPos}
                userPos={userPos}
              />
           </div>
        </div>
      </div>
      
      {/* Order Summary below */}
      <div className="mt-12 bg-white rounded-[3rem] p-10 shadow-premium border border-gray-100">
         <h3 className="text-2xl font-black text-text-primary mb-8 underline decoration-primary/20 decoration-8 underline-offset-0">Order Summary</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-l-4 border-primary pl-4">Restaurant</p>
               <h4 className="text-xl font-bold mb-2">The Burger King</h4>
               <p className="text-sm text-text-secondary">Sector 62, Noida, Uttar Pradesh</p>
            </div>
            <div>
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-l-4 border-secondary pl-4">Delivery Address</p>
               <h4 className="text-xl font-bold mb-2">Home (John Doe)</h4>
               <p className="text-sm text-text-secondary truncate">H.No 123, Street 5, Royal Palms, Sector 62, Noida</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OrderDetail;
