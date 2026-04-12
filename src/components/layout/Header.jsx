import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useLocationStore } from '../../store/locationStore';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuthStore();
  const { items } = useCartStore();
  const { city } = useLocationStore();
  const navigate = useNavigate();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      isScrolled ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 py-2 shadow-sm' : 'bg-white py-4'
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo & Location */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
              <span className="text-white font-black text-2xl tracking-tighter">AG</span>
            </div>
            <span className="text-2xl font-black text-primary hidden sm:block">AntiGravity</span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 group hover:border-primary/30 transition-colors cursor-pointer">
            <MapPin className="text-primary" size={18} />
            <span className="text-sm font-medium text-text-secondary">{city || 'Select Location'}</span>
            <ChevronDown size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search for restaurants, cuisines..." 
              className="bg-gray-50 border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-xl pl-10 pr-4 py-2.5 text-sm w-64 lg:w-96 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-4 border-l border-gray-100 pl-6">
            <Link to="/cart" className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ShoppingCart size={22} className="text-text-primary" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="h-9 w-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <ChevronDown size={16} className={cn("text-gray-400 transition-transform", isProfileOpen && "rotate-180")} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-premium border border-gray-100 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-sm font-bold text-text-primary">{user?.name}</p>
                      <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                    </div>
                    <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors">
                      <ShoppingCart size={16} /> My Orders
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors">
                        <User size={16} /> Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={() => { logout(); navigate('/'); }}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 w-full text-left transition-colors font-medium"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-gray-50 text-text-primary"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="p-4 space-y-4">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm w-full outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full" size="md">Cart ({cartItemCount})</Button>
                </Link>
                {isAuthenticated ? (
                  <Button variant="danger" className="w-full" size="md" onClick={logout}>Logout</Button>
                ) : (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full" size="md">Login</Button>
                  </Link>
                )}
              </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
