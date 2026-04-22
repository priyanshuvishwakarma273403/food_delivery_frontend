import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Minus, ShoppingBag, 
  CreditCard, RefreshCcw, User, MessageSquare, 
  Phone, Mail, ChevronRight, HelpCircle,
  MessageCircle, Info
} from 'lucide-react';
import { cn } from '../utils/cn';

const FAQ_CATEGORIES = [
  { id: 'orders', label: 'Orders', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 'payments', label: 'Payments', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 'refunds', label: 'Refunds', icon: RefreshCcw, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 'account', label: 'Account', icon: User, color: 'text-purple-500', bg: 'bg-purple-50' },
];

const HELP_DATA = [
  {
    category: "orders",
    questions: [
      { q: "How do I track my order live?", a: "Once your order is placed, you can see a 'Track Order' button on the order confirmation screen or in the 'My Orders' section of your profile." },
      { q: "Can I edit my delivery address after ordering?", a: "Unfortunately, addresses cannot be changed once an order is confirmed. However, you can contact our support team immediately to see if the driver can be notified." },
      { q: "What if my food is late?", a: "We strive for on-time delivery. If your order is significantly delayed, you will be eligible for a 'Tomato Refund' as per our late delivery policy." }
    ]
  },
  {
    category: "payments",
    questions: [
      { q: "What payment methods are available?", a: "We accept all major Credit/Debit cards, UPI (GPay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD)." },
      { q: "Is my payment information secure?", a: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure your data is always protected." }
    ]
  },
  {
    category: "refunds",
    questions: [
      { q: "How long does a refund take?", a: "UPI refunds are usually instant. Credit/Debit card refunds take 5-7 business days depending on your bank's processing time." },
      { q: "Where can I see my refund status?", a: "Go to 'My Orders', select the cancelled order, and click on 'Refund Status' for a real-time update." }
    ]
  }
];

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('orders');
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = HELP_DATA.find(c => c.category === activeCategory)?.questions.filter(
    item => item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen pb-24 pt-16 md:pt-24 bg-[#F8F9FB]">
      <div className="container mx-auto px-4 lg:max-w-5xl">
        
        {/* ── Hero Section ── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <HelpCircle size={14} /> 24/7 Support Center
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-[#1C1C1C] mb-8 tracking-tighter">
            How can we <span className="text-primary italic">help?</span>
          </h1>
          
          <div className="relative max-w-2xl mx-auto group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Describe your issue (e.g. refund, late delivery)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-transparent focus:border-primary/20 focus:ring-8 focus:ring-primary/5 rounded-[2rem] pl-16 pr-8 py-6 text-lg font-bold outline-none transition-all shadow-xl shadow-black/5 placeholder:font-medium"
            />
          </div>
        </div>

        {/* ── Category Selection ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "p-6 rounded-[2.5rem] border-2 transition-all duration-300 text-left relative overflow-hidden group",
                activeCategory === cat.id 
                  ? "bg-white border-primary/20 shadow-xl shadow-primary/5" 
                  : "bg-white border-transparent hover:border-gray-200"
              )}
            >
              <div className={cn(
                "h-14 w-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                cat.bg, cat.color
              )}>
                <cat.icon size={28} strokeWidth={2.5} />
              </div>
              <p className="font-black text-[#1C1C1C] text-lg">{cat.label}</p>
              <p className="text-[10px] font-bold text-[#686B78] uppercase tracking-widest mt-1">Common Issues</p>
              {activeCategory === cat.id && (
                <motion.div layoutId="cat-indicator" className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── FAQ Accordions ── */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-2xl font-black text-[#1C1C1C] mb-6 flex items-center gap-3">
              <Info className="text-primary" /> Top Questions
            </h3>
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className={cn(
                        "bg-white rounded-[2rem] border-2 transition-all duration-300 overflow-hidden",
                        isOpen ? "border-primary/20 shadow-lg" : "border-transparent hover:border-gray-200"
                      )}
                    >
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left"
                      >
                        <span className={cn("font-bold text-lg pr-4", isOpen ? "text-primary" : "text-[#1C1C1C]")}>
                          {faq.q}
                        </span>
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                          isOpen ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                        )}>
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-gray-50/50"
                          >
                            <div className="px-8 pb-8 pt-2 text-[#686B78] font-medium leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }) : (
                  <div className="text-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                    <Search size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-[#686B78] font-bold">No results found for your search.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Support Dock ── */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-[#1C1C1C] rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
                <MessageSquare size={120} className="absolute -right-8 -bottom-8 text-white/5 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10">
                   <h3 className="text-2xl font-black mb-2">Still need help?</h3>
                   <p className="text-gray-400 text-sm font-medium mb-8">Our support superheroes are ready to assist you 24/7.</p>
                   
                   <div className="space-y-3">
                      <button className="w-full bg-primary py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm hover:scale-[1.02] transition-transform">
                         <MessageCircle size={20} /> Chat with us
                      </button>
                      <button className="w-full bg-white/10 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm hover:bg-white/20 transition-all">
                         <Phone size={20} /> Call Support
                      </button>
                      <button className="w-full border border-white/10 py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-sm hover:bg-white/5 transition-all">
                         <Mail size={20} /> Send an Email
                      </button>
                   </div>
                </div>
             </div>

             <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">Official Contact</p>
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#1C1C1C]">
                         <Phone size={20} />
                      </div>
                      <div>
                         <p className="text-xs text-[#686B78] font-bold">Helpline</p>
                         <p className="text-sm font-black">+91 9369420619</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#1C1C1C]">
                         <Mail size={20} />
                      </div>
                      <div>
                         <p className="text-xs text-[#686B78] font-bold">Email</p>
                         <p className="text-sm font-black">support@tomato.food</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

