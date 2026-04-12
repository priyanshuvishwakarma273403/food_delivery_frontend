import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Clock, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';

const DUMMY_ORDERS = [
  { id: 'ORD5542', date: 'Oct 24, 2023 08:30 PM', restaurant: 'The Burger King', total: 450, status: 'DELIVERED', items: 3, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80' },
  { id: 'ORD5589', date: 'Oct 26, 2023 12:15 PM', restaurant: 'Pizza Express', total: 850, status: 'PREPARING', items: 2, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
  { id: 'ORD6021', date: 'Oct 28, 2023 09:45 PM', restaurant: 'Spice Garden', total: 320, status: 'PLACED', items: 1, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
];

const statusConfig = {
  PLACED: { label: 'Order Placed', variant: 'info' },
  PREPARING: { label: 'Preparing', variant: 'warning' },
  OUT_FOR_DELIVERY: { label: 'On the Way', variant: 'warning' },
  DELIVERED: { label: 'Delivered', variant: 'success' },
  CANCELLED: { label: 'Cancelled', variant: 'error' },
};

const Orders = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 lg:max-w-5xl">
       <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-text-primary mb-2">My Orders</h1>
            <p className="text-text-secondary">Check the status of your recent deliveries</p>
          </div>
          <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm">
             <ShoppingBag size={28} />
          </div>
       </div>

       <div className="space-y-8">
          {DUMMY_ORDERS.map((order, idx) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-premium border border-gray-100 group overflow-hidden relative"
            >
               {/* Decorative Gradient */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />

               <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                  <div className="h-28 w-28 rounded-3xl overflow-hidden shrink-0 shadow-lg border-4 border-white">
                    <img src={order.image} alt={order.restaurant} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex-1">
                     <div className="flex flex-wrap items-center gap-4 mb-3">
                        <Badge variant={statusConfig[order.status].variant} className="px-4 py-1.5 rounded-xl font-black text-[10px]">
                          {statusConfig[order.status].label}
                        </Badge>
                        <span className="text-xs font-bold text-gray-400">ID: {order.id}</span>
                     </div>
                     <h3 className="text-2xl font-black text-text-primary mb-1 group-hover:text-primary transition-colors">{order.restaurant}</h3>
                     <p className="text-sm text-text-secondary flex items-center gap-2 mb-6">
                        <Clock size={16} className="text-gray-300" /> {order.date}
                     </p>
                     
                     <div className="flex flex-wrap gap-8">
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Items</p>
                           <p className="font-bold text-text-primary">{order.items} dishes ordered</p>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Total Amount</p>
                           <p className="font-bold text-primary text-lg">₹{order.total}</p>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                     <Link to={`/orders/${order.id}`}>
                        <button className="w-full md:w-48 bg-gray-50 hover:bg-primary hover:text-white text-text-primary px-6 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all group/btn">
                           Track Order <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                     </Link>
                     <button className="w-full md:w-48 border border-gray-100 hover:border-primary/20 hover:bg-primary/5 text-text-secondary hover:text-primary px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all">
                        <Star size={16} /> Rate Order
                     </button>
                  </div>
               </div>
            </motion.div>
          ))}
       </div>

       <div className="mt-16 text-center">
          <p className="text-text-secondary text-sm mb-6 font-medium">Ordering for a large group?</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-sm border border-gray-100">
             <MapPin size={16} className="text-primary" />
             <span className="text-sm font-bold text-text-primary">Bulk Order for Corporate</span>
             <Badge variant="info">Coming Soon</Badge>
          </div>
       </div>
    </div>
  );
};

export default Orders;
