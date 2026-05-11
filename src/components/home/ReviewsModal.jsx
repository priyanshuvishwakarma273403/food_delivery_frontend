import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, CheckCircle2 } from 'lucide-react';

const ALL_REVIEWS = [
  { name: 'Ashu Yadav', rating: 5, date: '2 days ago', text: 'The best food delivery app in Mumbai! Delivery is always before time and the packaging is superb.', avatar: 'https://i.pravatar.cc/150?u=ashu' },
  { name: 'Faiz Khan', rating: 5, date: '1 week ago', text: 'Love the variety of cuisines. The dynamic hero section and category tabs make it so easy to find exactly what I am craving for.', avatar: 'https://i.pravatar.cc/150?u=faiz' },
  { name: 'Ankit Kumar', rating: 5, date: '3 weeks ago', text: 'Lightning fast delivery. I ordered Biryani and it reached me in 20 minutes! The live tracking feature is really smooth.', avatar: 'https://i.pravatar.cc/150?u=ankit' },
  { name: 'Rahul Sharma', rating: 4, date: '1 month ago', text: 'Great experience overall. The food was hot and fresh. Minor delay once but the support team handled it well.', avatar: 'https://i.pravatar.cc/150?u=rahul' },
  { name: 'Neha Gupta', rating: 5, date: '1 month ago', text: 'Amazing user interface! Very easy to use and the discounts are better than other apps.', avatar: 'https://i.pravatar.cc/150?u=neha' },
  { name: 'Pooja Varma', rating: 5, date: '2 months ago', text: 'Pure Veg options are great here. Highly recommend for family orders.', avatar: 'https://i.pravatar.cc/150?u=pooja' },
  { name: 'Deepak Raj', rating: 4, date: '2 months ago', text: 'Reliable service. The rider was very polite and followed all safety protocols.', avatar: 'https://i.pravatar.cc/150?u=deepak' },
  { name: 'Amit Singh', rating: 5, date: '3 months ago', text: 'Best interface I have seen in a food app. Smooth transitions and no bugs.', avatar: 'https://i.pravatar.cc/150?u=amit' },
  { name: 'Sunil Mehra', rating: 5, date: '3 months ago', text: 'Ordering from Tomato for 6 months now. Never disappointed with the quality.', avatar: 'https://i.pravatar.cc/150?u=sunil' },
  { name: 'Kavita Reddy', rating: 4, date: '4 months ago', text: 'Good variety of local restaurants. Fast delivery even during peak hours.', avatar: 'https://i.pravatar.cc/150?u=kavita' },
  { name: 'Rajesh Kumar', rating: 5, date: '5 months ago', text: 'The AI mood search actually works! Found a great place for healthy food through it.', avatar: 'https://i.pravatar.cc/150?u=rajesh' },
  { name: 'Megha Jain', rating: 5, date: '6 months ago', text: 'Everything is just perfect. From UI to UX to Delivery.', avatar: 'https://i.pravatar.cc/150?u=megha' },
];

const ReviewsModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-6 md:p-10 border-b border-gray-100 bg-white sticky top-0 z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-3xl md:text-5xl font-black text-[#1C1C1C] tracking-tight mb-2">Customer Reviews</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-lg border border-green-100">
                       <span className="text-lg font-black text-green-600">4.8</span>
                       <Star size={16} fill="#16A34A" className="text-green-600" />
                    </div>
                    <div className="h-10 w-[1px] bg-gray-200" />
                    <div>
                      <p className="text-2xl font-black text-[#1C1C1C] leading-none">2,540</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Verified Reviews</p>
                    </div>
                    <div className="h-10 w-[1px] bg-gray-200" />
                    <div className="bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100">
                       <p className="text-xs font-black text-orange-600 uppercase tracking-widest">5M+ Foodies</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={onClose}
                  className="h-14 w-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            {/* Body - Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ALL_REVIEWS.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-3xl border border-gray-50 bg-gray-50/50 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-primary/10">
                        <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#1C1C1C] text-sm">{review.name}</h4>
                          <CheckCircle2 size={12} className="text-blue-500" />
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[1,2,3,4,5].map(star => (
                          <Star key={star} size={10} fill={star <= review.rating ? "#FBBC05" : "#E8E8E8"} strokeWidth={0} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#686B78] leading-relaxed italic">
                      "{review.text}"
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 text-center py-8 border-t border-dashed border-gray-100">
                 <p className="text-sm text-gray-400 font-medium">End of verified reviews</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReviewsModal;
