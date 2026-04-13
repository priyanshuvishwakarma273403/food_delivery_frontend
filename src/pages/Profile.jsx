import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useWalletStore } from '../store/walletStore';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Search, ChevronRight, 
  Settings, HelpCircle, FileText, Bell, LogOut,
  ShoppingBag, Star, Crown, Coins, CreditCard
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const { coins } = useWalletStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pb-20 md:pb-10 pt-16 md:pt-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:max-w-4xl py-8">
        {/* Profile Details Header */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-6 md:p-10 mb-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/10 to-orange-500/10" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 mt-8">
            <div className="h-24 w-24 md:h-32 md:w-32 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-4xl shadow-xl shadow-primary/20 border-4 border-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-black text-text-primary mb-1">{user?.name || 'Guest User'}</h1>
              <p className="text-text-secondary font-medium flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} /> {user?.email || 'guest@tomato.com'}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                {user?.isPremium ? (
                  <Link to="/gold">
                    <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-yellow-500/20 hover:scale-105 transition-transform cursor-pointer">
                      <Crown size={14} /> Gold Member
                    </span>
                  </Link>
                ) : (
                  <Link to="/gold">
                    <span className="bg-gray-100 text-gray-400 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 hover:bg-yellow-50 hover:text-yellow-600 transition-colors cursor-pointer">
                      Join Gold
                    </span>
                  </Link>
                )}
                
                <span className="bg-orange-50 text-orange-600 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5 border border-orange-100">
                  <Coins size={14} /> {coins} Coins
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Quick Actions / Stats */}
          <div className="md:col-span-4 space-y-4">
             <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 grid grid-cols-2 gap-4 text-center">
                <Link to="/orders" className="p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors group">
                   <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary mx-auto mb-2 shadow-sm">
                      <ShoppingBag size={20} />
                   </div>
                   <p className="font-bold text-sm">Orders</p>
                </Link>
                <div className="p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors group cursor-pointer">
                   <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary mx-auto mb-2 shadow-sm">
                      <Star size={20} />
                   </div>
                   <p className="font-bold text-sm">Favorites</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors group cursor-pointer">
                   <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary mx-auto mb-2 shadow-sm">
                      <MapPin size={20} />
                   </div>
                   <p className="font-bold text-sm">Addresses</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 hover:bg-primary/5 hover:text-primary transition-colors group cursor-pointer">
                   <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary mx-auto mb-2 shadow-sm">
                      <CreditCard size={20} />
                   </div>
                   <p className="font-bold text-sm">Payments</p>
                </div>
             </div>

             <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-3xl p-6 shadow-xl py-8 text-white relative overflow-hidden group">
                <Crown size={100} className="absolute -right-6 -bottom-6 text-yellow-400/20 group-hover:scale-110 transition-transform" />
                <h3 className="font-black text-2xl mb-1">{user?.isPremium ? 'Gold Active' : 'Get Gold'}</h3>
                <p className="text-yellow-100 text-sm font-medium mb-4">{user?.isPremium ? 'Enjoy free deliveries & VIP perks.' : 'Save big on delivery fees.'}</p>
                <Link to="/gold">
                  <button className="bg-white text-yellow-600 px-6 py-2 rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
                     {user?.isPremium ? 'Manage' : 'Join Now'}
                  </button>
                </Link>
             </div>
          </div>

          {/* Menu Items */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              <ProfileMenuItem icon={Settings} label="Account Settings" />
              <ProfileMenuItem icon={Bell} label="Notifications" />
              <ProfileMenuItem icon={HelpCircle} label="Help & Support" to="/faq" />
              <ProfileMenuItem icon={FileText} label="Terms & Conditions" to="/terms" />
              <ProfileMenuItem icon={FileText} label="Privacy Policy" to="/privacy" />
              
              <button 
                onClick={handleLogout}
                className="w-full p-6 flex items-center gap-4 hover:bg-red-50 text-red-500 transition-colors text-left"
              >
                <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                  <LogOut size={24} />
                </div>
                <div className="flex-1 font-bold">Logout</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileMenuItem = ({ icon: Icon, label, to = "#" }) => (
  <Link to={to} className="w-full p-6 flex items-center gap-4 hover:bg-gray-50 text-text-primary transition-colors">
    <div className="h-12 w-12 bg-gray-50 rounded-xl flex items-center justify-center text-text-secondary shrink-0">
      <Icon size={24} />
    </div>
    <div className="flex-1 font-bold text-lg">{label}</div>
    <ChevronRight className="text-gray-300" />
  </Link>
);

export default Profile;
