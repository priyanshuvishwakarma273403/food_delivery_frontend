import { motion } from 'framer-motion';
import { Bike, DollarSign, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';

const DeliveryPartnerCTA = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-10 bg-white">
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=1200&q=80" 
          alt="Delivery Partner" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container mx-auto px-4 lg:max-w-6xl">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Earn on your own terms.</h1>
              <p className="text-xl text-gray-300 mb-8">
                Join our fleet of delivery partners. Be your own boss, choose your own hours, and earn weekly payouts.
              </p>
              <Button className="px-8 py-4 rounded-2xl text-lg shadow-xl shadow-primary/30">
                Apply Now <Bike className="ml-2 inline" size={20} />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-4">Why ride with Tomato?</h2>
          <p className="text-text-secondary text-lg">We offer the best terms in the industry for our partners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: DollarSign, title: 'Weekly Payouts', desc: 'Get your earnings transferred directly to your bank account every week. No delays.' },
            { icon: Clock, title: 'Flexible Timings', desc: 'Log in and deliver when you want. You are in complete control of your schedule.' },
            { icon: MapPin, title: 'Local Deliveries', desc: 'Deliver in areas you know well. Short distances mean more deliveries and more earnings.' }
          ].map((feature, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 text-center hover:shadow-premium transition-all">
              <div className="h-16 w-16 bg-white shadow-sm rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-text-primary mb-3">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 border border-primary/10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-6">Simple Application Process</h2>
            <ul className="space-y-4">
               {[
                 'Have a valid two-wheeler driving license',
                 'Have a smartphone (Android or iOS)',
                 'Provide valid ID and bank details',
                 'Complete a quick background check'
               ].map((req, i) => (
                 <li key={i} className="flex items-center gap-3 text-lg text-text-secondary">
                   <CheckCircle2 className="text-green-500 shrink-0" /> {req}
                 </li>
               ))}
            </ul>
          </div>
          <div className="w-full md:w-[400px] bg-white p-8 rounded-[2rem] shadow-premium border border-gray-100">
            <h3 className="text-2xl font-black text-text-primary mb-6 text-center">Start your journey</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:ring-2 focus:ring-primary/5 rounded-xl p-4 text-sm outline-none transition-all" />
              <input type="tel" placeholder="Mobile Number" className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:ring-2 focus:ring-primary/5 rounded-xl p-4 text-sm outline-none transition-all" />
              <input type="text" placeholder="City" className="w-full bg-gray-50 border border-transparent focus:border-primary/20 focus:ring-2 focus:ring-primary/5 rounded-xl p-4 text-sm outline-none transition-all" />
              <Button className="w-full py-4 rounded-xl mt-2">Submit Details</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPartnerCTA;
