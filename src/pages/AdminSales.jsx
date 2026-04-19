import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Tag, 
  MessageSquare, 
  Percent, 
  Bell, 
  History, 
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import api from '../api/axios'; // Assuming axios instance exists
import { toast } from 'react-hot-toast';

const AdminSales = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    discountPercentage: '',
    promoCode: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // API call to the backend endpoint we created
      await api.post('/admin/sales/start', {
        ...formData,
        discountPercentage: parseFloat(formData.discountPercentage)
      });
      
      toast.success('Sale notifications triggered successfully!');
      setFormData({
        title: '',
        description: '',
        discountPercentage: '',
        promoCode: '',
        message: ''
      });
    } catch (error) {
      console.error('Error triggering sale:', error);
      toast.error(error.response?.data || 'Failed to trigger notifications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-black text-text-primary">Flash Sale Manager</h1>
          <p className="text-text-secondary font-medium mt-1">Blast notifications to all registered users via Kafka</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[3rem] shadow-premium border border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-text-primary mb-2 uppercase tracking-wider">Sale Title</label>
                  <div className="relative">
                    <Bell className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Diwali Bumper Sale"
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-primary/20 font-bold transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-black text-text-primary mb-2 uppercase tracking-wider">Discount %</label>
                    <div className="relative">
                      <Percent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        required
                        type="number"
                        name="discountPercentage"
                        value={formData.discountPercentage}
                        onChange={handleChange}
                        placeholder="e.g. 50"
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-primary/20 font-bold transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-black text-text-primary mb-2 uppercase tracking-wider">Promo Code</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        required
                        type="text"
                        name="promoCode"
                        value={formData.promoCode}
                        onChange={handleChange}
                        placeholder="e.g. DIWALI50"
                        className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-primary/20 font-bold transition-all uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-text-primary mb-2 uppercase tracking-wider">Description</label>
                  <input 
                    required
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief summary of the sale"
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-primary/20 font-bold transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-text-primary mb-2 uppercase tracking-wider">Email Content</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Write the message that users will receive in their email..."
                      className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl outline-none focus:ring-2 ring-primary/20 font-bold transition-all"
                    ></textarea>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 rounded-[2rem] text-lg gap-3 shadow-xl shadow-primary/20"
                >
                  {loading ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <History size={24} />
                    </motion.div>
                  ) : (
                    <Send size={24} />
                  )}
                  {loading ? 'Processing...' : 'Broadcast Sale Event'}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Guidelines Section */}
          <div className="space-y-8">
            <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
              <h3 className="text-lg font-black text-primary flex items-center gap-2 mb-4">
                <AlertCircle size={20} /> Kafka Engine
              </h3>
              <p className="text-sm font-bold text-text-secondary leading-relaxed">
                This process triggers a high-volume event stream. Notifications will be processed asynchronously via our microservices architecture.
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-2 text-xs font-black text-text-primary">
                  <CheckCircle2 size={14} className="text-green-500" /> Multi-threaded delivery
                </li>
                <li className="flex items-center gap-2 text-xs font-black text-text-primary">
                  <CheckCircle2 size={14} className="text-green-500" /> Automatic Retry Mechanism
                </li>
                <li className="flex items-center gap-2 text-xs font-black text-text-primary">
                  <CheckCircle2 size={14} className="text-green-500" /> DLQ for failed deliveries
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-gray-100">
               <h3 className="text-lg font-black text-text-primary flex items-center gap-2 mb-6">
                 <History size={20} className="text-gray-400" /> Recent Activity
               </h3>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                   <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
                     <CheckCircle2 size={20} />
                   </div>
                   <div>
                     <p className="text-sm font-black text-text-primary">New Year Flash Sale</p>
                     <p className="text-xs font-bold text-text-secondary">Sent to 1.2L users • 2h ago</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 opacity-50">
                   <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                     <CheckCircle2 size={20} />
                   </div>
                   <div>
                     <p className="text-sm font-black text-text-primary">Christmas Eve Bash</p>
                     <p className="text-xs font-bold text-text-secondary">Sent to 98K users • 1d ago</p>
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

export default AdminSales;
