import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, DollarSign, Clock, MapPin, CheckCircle2, ShieldCheck, Zap, ArrowRight, Star } from 'lucide-react';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';

const DeliveryPartnerCTA = () => {
  const formRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', vehicle: 'Bike' });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.city) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      toast.success('Application submitted successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-[#F8F9FB]">
      {/* Hero */}
      <div className="relative h-[500px] md:h-[650px] bg-[#02060C] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=1600&q=80" 
          alt="Delivery Partner" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 z-10 flex items-center bg-gradient-to-t from-[#02060C] via-transparent to-transparent">
          <div className="container mx-auto px-4 lg:max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20">
                  <Zap size={14} className="fill-primary" /> Join the fastest growing fleet
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
                  Earn on your <span className="text-primary italic">own terms.</span>
                </h1>
                <p className="text-xl text-gray-300 mb-10 max-w-lg font-medium leading-relaxed">
                  Join our fleet of 10,000+ delivery partners. Be your own boss, choose your own hours, and earn up to ₹35,000/month.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={scrollToForm} className="px-10 py-5 rounded-2xl text-lg shadow-2xl shadow-primary/30 font-black h-auto">
                    Become a Partner <ArrowRight className="ml-2 inline" size={20} />
                  </Button>
                  <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="h-10 w-10 rounded-full border-2 border-[#02060C]" />
                      ))}
                    </div>
                    <div>
                      <div className="flex text-yellow-400 gap-0.5">
                        {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                      <p className="text-[10px] font-black text-white uppercase tracking-wider">Trusted by 10K+ Riders</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 lg:max-w-7xl">
        {/* Why Tomato? */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-[#1C1C1C] mb-6 tracking-tighter">Why ride with <span className="text-primary italic">Tomato?</span></h2>
          <p className="text-[#686B78] text-xl font-medium max-w-2xl mx-auto">We offer the most transparent earnings and flexible working conditions in the industry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: DollarSign, title: 'Weekly Payouts', desc: 'Get your earnings transferred directly to your bank account every week. No delays, full transparency.' },
            { icon: Clock, title: 'Flexible Timings', desc: 'Log in and deliver when you want. You are in complete control of your work-life balance.' },
            { icon: ShieldCheck, title: 'Insurance Cover', desc: 'Every delivery partner is covered by our comprehensive medical and accidental insurance policy.' }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-black/5 flex flex-col group"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-[1.5rem] flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <feature.icon size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-[#1C1C1C] mb-4">{feature.title}</h3>
              <p className="text-[#686B78] leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Application Section */}
        <div ref={formRef} className="bg-[#1C1C1C] rounded-[4rem] p-10 md:p-20 border border-white/10 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.2)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="flex-1 relative z-10 text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Simple 3-step <br /><span className="text-primary italic">onboarding.</span></h2>
            <div className="space-y-8">
               {[
                 { t: 'Digital Application', d: 'Submit your basic details and documents through the form.' },
                 { t: 'Quick Verification', d: 'Our team will verify your driving license and vehicle info.' },
                 { t: 'Ready to Earn', d: 'Attend a 15-min online training and start delivering.' }
               ].map((step, i) => (
                 <div key={i} className="flex gap-6 group">
                   <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                     {i + 1}
                   </div>
                   <div>
                     <h4 className="text-xl font-black mb-1">{step.t}</h4>
                     <p className="text-gray-400 font-medium">{step.d}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="w-full lg:w-[480px] relative z-10">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl"
                >
                  <h3 className="text-3xl font-black text-[#1C1C1C] mb-8">Start your journey</h3>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Rahul Sharma" 
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 text-base font-bold outline-none transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+91 00000 00000" 
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 text-base font-bold outline-none transition-all" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">City</label>
                        <input 
                          type="text" 
                          required
                          value={formData.city}
                          onChange={e => setFormData({...formData, city: e.target.value})}
                          placeholder="e.g. Delhi" 
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 text-base font-bold outline-none transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Vehicle</label>
                        <select 
                          value={formData.vehicle}
                          onChange={e => setFormData({...formData, vehicle: e.target.value})}
                          className="w-full bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl px-6 py-4 text-base font-bold outline-none transition-all appearance-none"
                        >
                          <option>Bike</option>
                          <option>Electric Scooter</option>
                          <option>Cycle</option>
                        </select>
                      </div>
                    </div>
                    <Button type="submit" loading={loading} className="w-full py-6 rounded-2xl mt-4 h-auto text-lg font-black shadow-xl shadow-primary/20">
                      Submit Application
                    </Button>
                  </form>
                  <p className="text-[10px] text-center text-gray-400 mt-6 font-bold leading-relaxed uppercase tracking-widest">
                    By submitting, you agree to Tomato's Partner Terms and Conditions.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 rounded-[3rem] shadow-2xl text-center"
                >
                  <div className="h-24 w-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
                    <CheckCircle2 size={48} strokeWidth={3} />
                  </div>
                  <h3 className="text-3xl font-black text-[#1C1C1C] mb-4">Application Received!</h3>
                  <p className="text-[#686B78] font-medium text-lg leading-relaxed mb-8">
                    Amazing! Our team will review your profile and reach out to you within <span className="text-primary font-black">24 hours</span>.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="secondary" className="w-full py-4 rounded-xl font-black">
                    Submit another application
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerCTA;

