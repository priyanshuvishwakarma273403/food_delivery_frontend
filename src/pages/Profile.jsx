import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useWalletStore } from '../store/walletStore';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Search, ChevronRight, 
  Settings, HelpCircle, FileText, Bell, LogOut,
  ShoppingBag, Star, Crown, Coins, CreditCard,
  ChevronLeft, Camera, Edit2, Shield, Heart
} from 'lucide-react';
import Button from '../components/common/Button';
import { cn } from '../utils/cn';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const { coins } = useWalletStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile'); // profile, orders, favorites, addresses, settings

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'favorites', label: 'Favorites', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FB] pb-24 md:pb-12 pt-16 md:pt-24">
      <div className="container mx-auto px-4 lg:max-w-6xl">
        
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between mb-6">
           <button onClick={() => navigate(-1)} className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
             <ChevronLeft size={20} />
           </button>
           <h1 className="text-xl font-black text-[#1C1C1C]">Account</h1>
           <div className="w-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* ── Left Sidebar (Navigation) ── */}
          <div className="md:col-span-4 lg:col-span-3 space-y-6">
             <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                      activeTab === tab.id 
                        ? `${tab.bg} ${tab.color} shadow-sm` 
                        : "text-[#686B78] hover:bg-gray-50"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                      activeTab === tab.id ? "bg-white shadow-sm" : "bg-gray-50 group-hover:bg-white"
                    )}>
                      <tab.icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="font-black text-sm">{tab.label}</span>
                    {activeTab === tab.id && (
                       <ChevronRight size={16} className="ml-auto opacity-50" />
                    )}
                  </button>
                ))}
             </div>

             {/* Gold Card */}
             <div className="bg-gradient-to-br from-[#1C1C1C] to-[#333] rounded-[2rem] p-6 text-white relative overflow-hidden group shadow-xl">
                <Crown size={80} className="absolute -right-4 -bottom-4 text-white/5 group-hover:rotate-12 transition-transform duration-500" />
                <div className="relative z-10">
                   <span className="bg-yellow-400 text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Premium</span>
                   <h3 className="text-xl font-black mt-2">Tomato Gold</h3>
                   <p className="text-gray-400 text-xs mt-1 leading-relaxed">Unlimited free deliveries and extra discounts on every order.</p>
                   <Link to="/gold">
                     <button className="mt-4 w-full bg-white text-black py-3 rounded-xl font-black text-xs hover:scale-[1.02] transition-transform">
                       Join Gold Now
                     </button>
                   </Link>
                </div>
             </div>

             <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors font-black text-sm"
              >
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <LogOut size={20} />
                </div>
                Logout Account
              </button>
          </div>

          {/* ── Right Content Area ── */}
          <div className="md:col-span-8 lg:col-span-9">
             <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 min-h-[500px] overflow-hidden"
                >
                  {activeTab === 'profile' && (
                    <div className="p-6 md:p-10">
                       <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-10 border-b border-gray-50">
                          <div className="relative group">
                             <div className="h-28 w-28 md:h-36 md:w-36 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-4xl shadow-2xl border-4 border-white overflow-hidden">
                                {user?.name?.charAt(0) || 'U'}
                             </div>
                             <button className="absolute bottom-1 right-1 h-10 w-10 bg-[#1C1C1C] text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg hover:scale-110 transition-transform">
                                <Camera size={16} />
                             </button>
                          </div>
                          <div className="text-center md:text-left space-y-2">
                             <h2 className="text-3xl font-black text-[#1C1C1C]">{user?.name || 'User'}</h2>
                             <p className="text-[#686B78] font-medium flex items-center justify-center md:justify-start gap-2">
                                <Mail size={16} className="text-primary" /> {user?.email}
                             </p>
                             <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                                <div className="bg-orange-50 px-4 py-1.5 rounded-full flex items-center gap-2 border border-orange-100">
                                   <Coins size={14} className="text-orange-500" />
                                   <span className="text-xs font-black text-orange-600">{coins} Coins</span>
                                </div>
                                <div className="bg-blue-50 px-4 py-1.5 rounded-full flex items-center gap-2 border border-blue-100">
                                   <Shield size={14} className="text-blue-500" />
                                   <span className="text-xs font-black text-blue-600">Verified</span>
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="p-6 rounded-3xl bg-[#F8F9FB] border border-gray-100 space-y-1">
                             <p className="text-[10px] font-black text-[#686B78] uppercase tracking-widest">Phone Number</p>
                             <p className="font-bold text-[#1C1C1C]">+91 {user?.phone || 'Not linked'}</p>
                          </div>
                          <div className="p-6 rounded-3xl bg-[#F8F9FB] border border-gray-100 space-y-1">
                             <p className="text-[10px] font-black text-[#686B78] uppercase tracking-widest">Account Created</p>
                             <p className="font-bold text-[#1C1C1C]">January 2024</p>
                          </div>
                       </div>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="p-6 md:p-10">
                       <h3 className="text-2xl font-black text-[#1C1C1C] mb-8">Account Settings</h3>
                       <form className="space-y-6 max-w-lg">
                          <div className="space-y-2">
                             <label className="text-xs font-black text-[#686B78] uppercase tracking-widest ml-1">Full Name</label>
                             <input 
                               type="text" 
                               defaultValue={user?.name}
                               className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-bold"
                               placeholder="Enter your name"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-xs font-black text-[#686B78] uppercase tracking-widest ml-1">Email Address</label>
                             <input 
                               type="email" 
                               defaultValue={user?.email}
                               disabled
                               className="w-full p-4 bg-gray-100 border-2 border-transparent rounded-2xl font-bold text-gray-400 cursor-not-allowed"
                             />
                          </div>
                          <div className="pt-4">
                             <Button className="px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary/20">
                                Save Changes
                             </Button>
                          </div>
                       </form>
                    </div>
                  )}

                  {activeTab === 'favorites' && (
                    <div className="p-6 md:p-10 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
                       <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                          <Heart size={40} />
                       </div>
                       <h3 className="text-2xl font-black text-[#1C1C1C] mb-2">No Favorites Yet</h3>
                       <p className="text-[#686B78] font-medium max-w-xs mx-auto mb-8">Start liking your favorite restaurants to see them here.</p>
                       <Link to="/restaurants">
                          <Button variant="ghost" className="font-black text-primary border-primary/20 hover:bg-primary/5 px-8">
                             Explore Restaurants
                          </Button>
                       </Link>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div className="p-6 md:p-10">
                       <div className="flex items-center justify-between mb-8">
                          <h3 className="text-2xl font-black text-[#1C1C1C]">Recent Orders</h3>
                          <Link to="/orders" className="text-primary font-black text-sm hover:underline">View All</Link>
                       </div>
                       <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                          <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                          <p className="text-[#686B78] font-bold">You haven't ordered anything yet!</p>
                       </div>
                    </div>
                  )}

                  {activeTab === 'addresses' && (
                    <div className="p-6 md:p-10">
                       <div className="flex items-center justify-between mb-8">
                          <h3 className="text-2xl font-black text-[#1C1C1C]">Saved Addresses</h3>
                          <Button className="py-2 px-6 rounded-xl text-xs font-black">+ Add New</Button>
                       </div>
                       <div className="p-6 rounded-3xl border-2 border-primary/10 bg-primary/5 flex items-start gap-4">
                          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm shrink-0">
                             <MapPin size={20} />
                          </div>
                          <div>
                             <p className="font-black text-[#1C1C1C]">Home</p>
                             <p className="text-xs text-[#686B78] font-medium mt-1">123, Luxury Heights, South Extension, New Delhi - 110001</p>
                          </div>
                       </div>
                    </div>
                  )}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

