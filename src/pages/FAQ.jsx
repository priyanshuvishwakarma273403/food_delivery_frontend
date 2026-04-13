import { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    category: "Ordering",
    questions: [
      { q: "How long does delivery usually take?", a: "Delivery times vary depending on the restaurant and your location, but our average delivery time is 35-45 minutes. You can track your order live on the app." },
      { q: "Can I cancel my order?", a: "You can cancel your order free of charge up to 5 minutes after placing it, provided the restaurant hasn't started preparing it yet." },
      { q: "Is there a minimum order value?", a: "Some restaurants may have a minimum order value, which will be displayed on their menu page. Tomato itself does not enforce a platform-wide minimum." }
    ]
  },
  {
    category: "Payments & Refunds",
    questions: [
      { q: "What payment methods do you accept?", a: "We accept all major Credit/Debit cards, UPI (GPay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD)." },
      { q: "When will I get my refund?", a: "Refunds to UPI are usually processed instantly but can take up to 24 hours. Refunds to credit/debit cards take 5-7 business days." }
    ]
  },
  {
    category: "Delivery & Safety",
    questions: [
      { q: "Do you offer contactless delivery?", a: "Yes, you can opt for contactless delivery during checkout. The delivery partner will leave the food at your doorstep and notify you." },
      { q: "How much is the delivery fee?", a: "Delivery fee depends on the distance between you and the restaurant. We offer FREE delivery on all orders above ₹500!" }
    ]
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(`0-0`);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen pb-20 md:pb-10 pt-16 md:pt-24 bg-white">
      <div className="container mx-auto px-4 lg:max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-6">Frequently Asked Questions</h1>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl pl-12 pr-6 py-4 text-base font-medium outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-12">
          {faqs.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h2 className="text-2xl font-black text-text-primary mb-6 px-2">{group.category}</h2>
              <div className="space-y-4">
                {group.questions
                  .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((faq, idx) => {
                  const id = `${groupIdx}-${idx}`;
                  const isOpen = openIndex === id;
                  
                  return (
                    <div 
                      key={id}
                      className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary shadow-lg shadow-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span className={`font-bold pr-4 ${isOpen ? 'text-primary' : 'text-text-primary'}`}>
                          {faq.q}
                        </span>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'}`}>
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
                            <div className="px-6 pb-5 pt-2 text-text-secondary leading-relaxed">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
