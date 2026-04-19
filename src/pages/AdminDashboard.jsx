import { motion } from 'framer-motion';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Package,
  Plus,
  MoreVertical,
  Search,
  LayoutDashboard,
  Home as HomeIcon,
  Bell
} from 'lucide-react';


import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

// Dummy Stats
const STATS = [
  { label: 'Total Orders', value: '1,280', color: 'bg-blue-500', icon: ShoppingBag, change: '+12.5%' },
  { label: 'Total Revenue', value: '₹4.2L', color: 'bg-green-500', icon: DollarSign, change: '+8.2%' },
  { label: 'Total Customers', value: '3,450', color: 'bg-orange-500', icon: Users, change: '+15.3%' },
  { label: 'Active Riders', value: '45', color: 'bg-primary', icon: Package, change: '+5.0%' },
];

const CHART_DATA = [
  { day: 'Mon', orders: 120, revenue: 12000 },
  { day: 'Tue', orders: 150, revenue: 15000 },
  { day: 'Wed', orders: 180, revenue: 21000 },
  { day: 'Thu', orders: 140, revenue: 11000 },
  { day: 'Fri', orders: 250, revenue: 35000 },
  { day: 'Sat', orders: 400, revenue: 60000 },
  { day: 'Sun', orders: 350, revenue: 52000 },
];

const PIE_DATA = [
  { name: 'Delivered', value: 400, color: '#26A541' },
  { name: 'Cancelled', value: 50, color: '#E23744' },
  { name: 'Preparing', value: 100, color: '#FC8019' },
  { name: 'On its way', value: 80, color: '#2563eb' },
];

const RECENT_ORDERS = [
  { id: 'ORD5542', customer: 'John Doe', restaurant: 'Burger King', amount: 450, status: 'DELIVERED' },
  { id: 'ORD5589', customer: 'Jane Smith', restaurant: 'Pizza Express', amount: 850, status: 'PREPARING' },
  { id: 'ORD6021', customer: 'Bob Marley', restaurant: 'Spice Garden', amount: 320, status: 'PLACED' },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex">
        {/* Sidebar Mini */}
        <aside className="w-80 h-screen bg-white border-r border-gray-100 p-8 sticky top-0 hidden lg:block">
           <div className="flex items-center gap-2 mb-12">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="text-white font-black text-xl tracking-tighter">T</span>
            </div>
            <span className="text-xl font-black text-primary">TomatoAdmin</span>
          </div>

          <nav className="space-y-6">
             <Link to="/admin" className="flex items-center gap-4 text-primary font-black bg-primary/5 p-4 rounded-2xl">
               <LayoutDashboard size={20} /> Dashboard
             </Link>
             <Link to="/admin/restaurants" className="flex items-center gap-4 text-text-secondary font-bold hover:text-primary p-4 rounded-2xl transition-all">
               <Package size={20} /> Restaurants
             </Link>
             <Link to="/admin/orders" className="flex items-center gap-4 text-text-secondary font-bold hover:text-primary p-4 rounded-2xl transition-all">
               <ShoppingBag size={20} /> Manage Orders
             </Link>
              <Link to="/admin/users" className="flex items-center gap-4 text-text-secondary font-bold hover:text-primary p-4 rounded-2xl transition-all">
                <Users size={20} /> User Management
              </Link>
              <Link to="/admin/sales" className="flex items-center gap-4 text-text-secondary font-bold hover:text-primary p-4 rounded-2xl transition-all">
                <Bell size={20} /> Manage Sales
              </Link>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <Link to="/" className="flex items-center gap-4 text-text-secondary font-bold hover:text-primary p-4 rounded-2xl transition-all">
                  <HomeIcon size={20} /> Back to Home
                </Link>
              </div>
          </nav>

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 overflow-hidden">
          <header className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-3xl font-black text-text-primary">System Overview</h1>
              <p className="text-text-secondary font-medium mt-1">Real-time performance analytics</p>
            </div>
            <div className="flex gap-4">
               <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                  <Search size={18} className="text-gray-400" />
                  <input type="text" placeholder="Global search..." className="outline-none text-sm font-medium w-40" />
               </div>
               <Link to="/admin/restaurants">
                 <Button className="px-6 rounded-2xl gap-2"><Plus size={18} /> Add Entity</Button>
               </Link>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-gray-100 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 h-24 w-24 ${stat.color} opacity-5 rounded-bl-[100px] transition-all group-hover:scale-110`} />
                <div className={`h-14 w-14 ${stat.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-gray-200`}>
                   <stat.icon size={28} />
                </div>
                <h3 className="text-3xl font-black text-text-primary mb-1">{stat.value}</h3>
                <p className="text-sm font-bold text-text-secondary flex items-center gap-2">
                   {stat.label} <span className="text-green-500 font-black">{stat.change}</span>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
             <div className="xl:col-span-2 bg-white p-10 rounded-[3rem] shadow-premium border border-gray-100">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-xl font-black text-text-primary">Revenue & Order Trends</h3>
                   <div className="flex gap-2">
                      <Badge variant="info">Weekly</Badge>
                      <Badge variant="gray">Monthly</Badge>
                   </div>
                </div>
                <div className="h-[350px]">
                   <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={CHART_DATA}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                         <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fontWeight: 600, fill: '#64748B' }} 
                            dy={10}
                         />
                         <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 12, fontWeight: 600, fill: '#64748B' }} 
                         />
                         <Tooltip 
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                         />
                         <Line type="monotone" dataKey="revenue" stroke="#E23744" strokeWidth={4} dot={{ r: 6, fill: '#E23744', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} />
                         <Line type="monotone" dataKey="orders" stroke="#FC8019" strokeWidth={4} dot={{ r: 6, fill: '#FC8019', strokeWidth: 3, stroke: '#fff' }} />
                      </LineChart>
                   </ResponsiveContainer>
                </div>
             </div>

             <div className="bg-white p-10 rounded-[3rem] shadow-premium border border-gray-100 flex flex-col items-center">
                <h3 className="text-xl font-black text-text-primary w-full mb-10">Order Status</h3>
                <div className="h-[250px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                         <Pie data={PIE_DATA} innerRadius={60} outerRadius={100} paddingAngle={10} dataKey="value">
                            {PIE_DATA.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                         </Pie>
                         <Tooltip />
                      </PieChart>
                   </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-8">
                   {PIE_DATA.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                         <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                         <span className="text-xs font-bold text-text-secondary">{item.name}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-white p-10 rounded-[3rem] shadow-premium border border-gray-100 overflow-hidden">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-text-primary">Recent Orders</h3>
                <Link to="/admin/orders" className="text-primary font-bold text-sm hover:underline">View All Orders</Link>
             </div>
             
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="border-b border-gray-100">
                         <th className="pb-6 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                         <th className="pb-6 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                         <th className="pb-6 text-xs font-black text-gray-400 uppercase tracking-widest">Restaurant</th>
                         <th className="pb-6 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                         <th className="pb-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                         <th className="pb-6 text-xs font-black text-gray-400 uppercase tracking-widest"></th>
                      </tr>
                   </thead>
                   <tbody>
                      {RECENT_ORDERS.map((order) => (
                         <tr key={order.id} className="border-b border-gray-50 last:border-0 group">
                            <td className="py-6 align-middle">
                               <span className="text-sm font-black text-text-primary">#{order.id}</span>
                            </td>
                            <td className="py-6 align-middle">
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-black">{order.customer.charAt(0)}</div>
                                  <span className="text-sm font-bold">{order.customer}</span>
                               </div>
                            </td>
                            <td className="py-6 align-middle">
                               <span className="text-sm font-medium text-text-secondary">{order.restaurant}</span>
                            </td>
                            <td className="py-6 align-middle text-sm font-black text-primary">₹{order.amount}</td>
                            <td className="py-6 align-middle">
                               <Badge variant={order.status === 'DELIVERED' ? 'success' : 'warning'}>{order.status}</Badge>
                            </td>
                            <td className="py-6 align-middle text-right">
                               <button className="text-gray-300 hover:text-primary transition-colors"><MoreVertical size={20} /></button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
