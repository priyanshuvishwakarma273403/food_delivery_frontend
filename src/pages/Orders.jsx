import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Clock, MapPin, Star, Package, RotateCcw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

const DUMMY_ORDERS = [
  { id: 'ORD5542', date: 'Oct 24, 2023 08:30 PM', restaurant: 'The Burger King', total: 450, status: 'DELIVERED', items: 3, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80' },
  { id: 'ORD5589', date: 'Oct 26, 2023 12:15 PM', restaurant: 'Pizza Express', total: 850, status: 'PREPARING', items: 2, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80' },
  { id: 'ORD6021', date: 'Oct 28, 2023 09:45 PM', restaurant: 'Spice Garden', total: 320, status: 'PLACED', items: 1, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
  { id: 'ORD6198', date: 'Nov 01, 2023 01:00 PM', restaurant: 'Sushi Zen', total: 1200, status: 'OUT_FOR_DELIVERY', items: 4, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80' },
  { id: 'ORD6234', date: 'Nov 03, 2023 07:45 PM', restaurant: 'Biryani Blues', total: 550, status: 'DELIVERED', items: 2, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80' },
];

const statusConfig = {
  PLACED: { label: 'Order Placed', variant: 'info', color: 'text-blue-500' },
  PREPARING: { label: 'Preparing', variant: 'warning', color: 'text-orange-500' },
  OUT_FOR_DELIVERY: { label: 'On the Way', variant: 'warning', color: 'text-orange-500' },
  DELIVERED: { label: 'Delivered', variant: 'success', color: 'text-green-500' },
  CANCELLED: { label: 'Cancelled', variant: 'error', color: 'text-red-500' },
};

const Orders = () => {
  const activeOrders = DUMMY_ORDERS.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const pastOrders = DUMMY_ORDERS.filter(o => o.status === 'DELIVERED' || o.status === 'CANCELLED');

  return (
    <div className="min-h-screen pb-20 md:pb-10">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-[56px] md:top-[72px] z-30">
        <div className="container mx-auto px-4 py-3 md:py-5 lg:max-w-5xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-3xl font-black text-text-primary">My Orders</h1>
              <p className="text-text-secondary text-xs md:text-sm mt-0.5">{DUMMY_ORDERS.length} orders placed</p>
            </div>
            <div className="h-10 w-10 md:h-12 md:w-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary">
              <ShoppingBag size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 lg:max-w-5xl">
        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <div className="mb-6 md:mb-10">
            <h2 className="text-sm md:text-base font-black text-text-primary mb-3 md:mb-4 flex items-center gap-2">
              <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse" />
              Active Orders ({activeOrders.length})
            </h2>
            <div className="space-y-3 md:space-y-4">
              {activeOrders.map((order, idx) => (
                <OrderCard key={order.id} order={order} idx={idx} isActive />
              ))}
            </div>
          </div>
        )}

        {/* Past Orders */}
        <div>
          <h2 className="text-sm md:text-base font-black text-text-primary mb-3 md:mb-4">
            Past Orders ({pastOrders.length})
          </h2>
          <div className="space-y-3 md:space-y-4">
            {pastOrders.map((order, idx) => (
              <OrderCard key={order.id} order={order} idx={idx} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {DUMMY_ORDERS.length === 0 && (
          <div className="text-center py-16 md:py-24">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl md:text-2xl font-black mb-2">No Orders Yet</h3>
            <p className="text-text-secondary text-sm mb-6">Looks like you haven't placed any orders</p>
            <Link to="/restaurants">
              <Button className="rounded-2xl px-8">Order Now</Button>
            </Link>
          </div>
        )}

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-text-secondary text-xs md:text-sm mb-4 font-medium">Ordering for a large group?</p>
          <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-white rounded-full shadow-sm border border-gray-100">
            <MapPin size={14} className="text-primary" />
            <span className="text-xs md:text-sm font-bold text-text-primary">Bulk Order for Corporate</span>
            <Badge variant="info" className="text-[10px]">Coming Soon</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, idx, isActive }) => {
  const config = statusConfig[order.status];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
    >
      <Link to={`/orders/${order.id}`}>
        <div className={`bg-white rounded-2xl md:rounded-[2rem] p-4 md:p-6 shadow-sm border border-gray-100 group hover:shadow-premium transition-all ${isActive ? 'border-l-4 border-l-primary' : ''}`}>
          <div className="flex gap-3 md:gap-6 items-start">
            {/* Image */}
            <div className="h-16 w-16 md:h-24 md:w-24 rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-sm">
              <img 
                src={order.image} 
                alt={order.restaurant} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                loading="lazy"
              />
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={config.variant} className="text-[9px] md:text-[10px] px-1.5 md:px-2 py-0.5">
                  {config.label}
                </Badge>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 hidden sm:block">#{order.id}</span>
              </div>
              
              <h3 className="text-sm md:text-lg font-bold text-text-primary truncate group-hover:text-primary transition-colors">
                {order.restaurant}
              </h3>
              
              <div className="flex items-center gap-2 text-[10px] md:text-xs text-text-secondary mt-1">
                <Clock size={12} className="text-gray-300 shrink-0" />
                <span className="truncate">{order.date}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2 md:mt-3">
                <div className="flex items-center gap-3 md:gap-6">
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase">Items</p>
                    <p className="text-xs md:text-sm font-bold text-text-primary">{order.items}</p>
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase">Total</p>
                    <p className="text-xs md:text-sm font-black text-primary">₹{order.total}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {order.status === 'DELIVERED' && (
                    <button 
                      onClick={(e) => { e.preventDefault(); }}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-[10px] md:text-xs font-bold text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <RotateCcw size={12} /> Reorder
                    </button>
                  )}
                  <div className="h-8 w-8 md:h-9 md:w-9 bg-gray-50 group-hover:bg-primary group-hover:text-white rounded-lg md:rounded-xl flex items-center justify-center text-gray-400 transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Active Order Progress */}
          {isActive && order.status !== 'DELIVERED' && (
            <div className="mt-3 pt-3 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ 
                      width: order.status === 'PLACED' ? '25%' : 
                             order.status === 'PREPARING' ? '50%' : 
                             order.status === 'OUT_FOR_DELIVERY' ? '75%' : '100%' 
                    }}
                  />
                </div>
                <span className={`text-[10px] font-bold ${config.color}`}>
                  {order.status === 'OUT_FOR_DELIVERY' ? 'Arriving soon' : config.label}
                </span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default Orders;
