import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Check, Zap, Truck, Star, Sparkles, X } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuthStore } from '../store/authStore';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const TomatoGold = () => {
  const { user, updateUser } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const isPremium = user?.isPremium;

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate real Razorpay processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    updateUser({ ...user, isPremium: true });
    setIsProcessing(false);
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FFA500', '#FF8C00']
    });
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10 pt-16 md:pt-20 bg-gray-50">
      {/* Premium Gradient Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-b-[4rem] md:rounded-b-[6rem]">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-gradient-to-b from-yellow-500/20 to-transparent rotate-12 blur-[100px]" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10 text-center lg:max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 px-6 py-2 rounded-full mb-8 shadow-xl shadow-yellow-500/10"
          >
            <Crown size={20} className="text-yellow-400" />
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-sm text-shadow">Tomato Gold</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            The ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">VIP Food Experience</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Free unlimited deliveries, exclusive discounts, and priority support. Elevate the way you eat every single day.
          </p>

          {!isPremium ? (
             <Button 
               className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-black shadow-2xl shadow-yellow-500/30 border-none transition-all hover:scale-105"
               onClick={handleSubscribe}
               loading={isProcessing}
             >
                {isProcessing ? 'Processing Payment...' : 'Join Gold @ ₹149/mo'} <Sparkles size={24} className="ml-2 inline" />
             </Button>
          ) : (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl inline-flex items-center gap-4 text-left">
               <div className="h-14 w-14 bg-gradient-to-tr from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center text-black">
                  <Check size={32} />
               </div>
               <div>
                  <h3 className="text-white font-black text-xl mb-1">You're a Gold Member!</h3>
                  <p className="text-yellow-400/80 text-sm font-bold">Enjoying unlimited free deliveries.</p>
               </div>
            </div>
          )}
        </div>
      </div>

      {/* Benifits grid */}
      <div className="container mx-auto px-4 -mt-12 md:-mt-16 lg:max-w-5xl relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <BenefitCard 
              icon={Truck} 
              title="Unlimited Free Delivery" 
              desc="No delivery fees on orders above ₹199 from all partner restaurants." 
           />
           <BenefitCard 
              icon={Zap} 
              title="Up to 30% Extra Off" 
              desc="Exclusive discounts that stack on top of regular promotional offers." 
           />
           <BenefitCard 
              icon={Star} 
              title="Priority Live Support" 
              desc="Skip the queue for any order issues with dedicated VIP agents." 
           />
        </div>
      </div>

      {/* Fake Reviews */}
      <div className="container mx-auto px-4 lg:max-w-4xl pt-10 pb-20">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-text-primary">Loved by 1M+ Members</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100 relative">
               <Crown className="absolute top-6 right-6 text-yellow-400/30" size={40} />
               <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
               </div>
               <p className="font-bold text-lg mb-6 leading-relaxed">"I easily save over ₹1000 every month just on delivery fees. Getting orders faster is an added bonus!"</p>
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-full">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                     <p className="font-black text-sm">Priya M.</p>
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Gold Member for 6 Months</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100 relative">
               <Crown className="absolute top-6 right-6 text-yellow-400/30" size={40} />
               <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
               </div>
               <p className="font-bold text-lg mb-6 leading-relaxed">"The extra 30% off stacking is crazy. I literally pay less than what it would cost to make it at home."</p>
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-100 rounded-full">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <div>
                     <p className="font-black text-sm">Rahul S.</p>
                     <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Gold Member for 1 Year</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-[2rem] shadow-premium border border-yellow-100 h-full flex flex-col items-center text-center group"
  >
    <div className="h-20 w-20 bg-yellow-50 rounded-[2rem] border border-yellow-100 flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
      <Icon size={36} />
    </div>
    <h3 className="text-xl font-black text-text-primary mb-3">{title}</h3>
    <p className="text-text-secondary leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

export default TomatoGold;
