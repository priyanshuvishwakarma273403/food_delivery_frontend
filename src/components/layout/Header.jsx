import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  LogOut,
  ChevronDown,
  Moon,
  Sun,
  Mic,
  Home,
  UtensilsCrossed,
  ClipboardList,
  UserCircle,
  ShoppingBag,
  Crown,
  Coins
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useLocationStore } from '../../store/locationStore';
import { useWalletStore } from '../../store/walletStore';
import { useTheme } from '../../context/ThemeContext';
import WalletBadge from '../wallet/WalletBadge';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuthStore();
  const { items, toggleDrawer } = useCartStore();
  const { city } = useLocationStore();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
      navigate(`/restaurants?search=${transcript}`);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Check if a nav item is active
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Bottom nav items
  const bottomNavItems = [
    { icon: Home, label: 'Home', to: '/' },
    { icon: ClipboardList, label: 'Blogs', to: '/blogs' },
    { icon: ShoppingBag, label: 'Cart', to: '/cart', badge: cartItemCount },
    { icon: ClipboardList, label: 'Orders', to: isAuthenticated ? '/orders' : '/login' },
    { icon: UserCircle, label: 'Account', to: isAuthenticated ? '/profile' : '/login' },
  ];

  return (
    <>
      <header className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
        isScrolled ? 'bg-white/90 dark:bg-card-main/90 backdrop-blur-lg border-gray-100 dark:border-gray-800 py-2 shadow-sm' : 'bg-white dark:bg-card-main py-2 md:py-4'
      )}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-2 md:gap-4">
          {/* Logo & Location */}
          <div className="flex items-center gap-2 md:gap-8 shrink-0">
            <Link to="/" className="flex items-center gap-1.5 md:gap-2">
              <div className="bg-primary p-1 md:p-1.5 rounded-lg shadow-lg shadow-primary/20">
                <span className="text-white font-black text-lg md:text-2xl tracking-tighter">T</span>
              </div>
              <span className="text-xl md:text-2xl font-black text-primary hidden sm:block">Tomato</span>
            </Link>

            <div className="hidden lg:flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 group hover:border-primary/30 transition-colors cursor-pointer">
              <MapPin className="text-primary" size={18} />
              <span className="text-sm font-medium text-text-secondary dark:text-gray-300">{city || 'Select Location'}</span>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          </div>

          {/* Desktop Search */}
          <nav className="hidden md:flex items-center gap-4 flex-1 max-w-2xl">
            <div className="relative group flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search for restaurants, cuisines..." 
                className="bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-xl pl-10 pr-12 py-2.5 text-sm w-full outline-none transition-all text-[#02060C] dark:text-white font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/restaurants?search=${searchQuery}`);
                  }
                }}
              />
              <button 
                onClick={handleVoiceSearch}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 transition-all p-1.5 rounded-lg",
                  isListening ? "text-primary animate-pulse bg-primary/10" : "text-gray-400 hover:text-primary"
                )}
              >
                <Mic size={18} />
              </button>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {isAuthenticated && <WalletBadge />}
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-text-secondary"
            >
              {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => toggleDrawer(true)}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag
                size={22} 
                className="text-[#1A1A1A] dark:text-white hover:text-primary transition-all cursor-pointer" 
                strokeWidth={2.5}
              />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-card-main">
                  {cartItemCount}
                </span>
              )}
            </button>

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
                      <div className="flex items-center gap-2">
                         <p className="text-sm font-bold text-text-primary">{user?.name}</p>
                         {user?.isPremium && (
                            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest flex items-center gap-1">
                               <Crown size={10} /> Gold
                            </span>
                         )}
                      </div>
                      <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                    </div>
                    {isAuthenticated && (
                       <div className="px-4 py-2.5 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                          <Link to="/gold" className="flex items-center gap-2 text-sm font-bold hover:text-yellow-600">
                             <Crown size={16} className="text-yellow-500" /> 
                             {user?.isPremium ? 'Manage Gold' : 'Join Gold'}
                          </Link>
                          <div className="flex items-center gap-1 text-sm font-black text-primary">
                             <Coins size={16} /> {coins}
                          </div>
                       </div>
                    )}
                    <Link to="/orders" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors">
                      <ShoppingCart size={16} /> My Orders
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors">
                        <User size={16} /> Admin Panel
                      </Link>
                    )}
                    {user?.role === 'ADMIN' && (
                      <Link to="/admin/blogs" className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-secondary hover:bg-gray-50 hover:text-primary transition-colors">
                        <ClipboardList size={16} /> Manage Blogs
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

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-text-secondary transition-colors"
            >
              {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => toggleDrawer(true)}
            >
              <div className="relative p-2 rounded-xl group hover:bg-white transition-all transform active:scale-95">
                <ShoppingCart size={24} className="text-black dark:text-white transition-colors" strokeWidth={2.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-text-primary dark:text-white"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatedMobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
          isAuthenticated={isAuthenticated}
          user={user}
          logout={logout}
          cartItemCount={cartItemCount}
          navigate={navigate}
        />
      </header>

      {/* Mobile Bottom Navigation - Fully Active with Highlights */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 safe-pb">
        <div className="flex items-center justify-around py-1.5">
          {bottomNavItems.map((item, i) => {
            const active = isActive(item.to);
            return (
              <Link 
                key={i} 
                to={item.to} 
                className={cn(
                  "flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all duration-300 relative min-w-[56px]",
                  active 
                    ? "text-primary" 
                    : "text-text-secondary hover:text-primary"
                )}
              >
                {/* Active indicator dot */}
                {active && (
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-1 w-5 bg-primary rounded-full" />
                )}
                <div className="relative">
                  <item.icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                  {/* Cart badge */}
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[8px] font-black h-4 min-w-[16px] px-0.5 rounded-full flex items-center justify-center border-2 border-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[10px] leading-tight",
                  active ? "font-black" : "font-semibold"
                )}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

// Animated Mobile Menu Component
const AnimatedMobileMenu = ({ isOpen, onClose, isAuthenticated, user, logout, cartItemCount, navigate }) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-300 shadow-lg">
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search for food & restaurants..." 
            className="bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm w-full outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                navigate(`/restaurants?search=${e.target.value}`);
                onClose();
              }
            }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Link to="/restaurants" onClick={onClose}>
            <Button variant="outline" className="w-full text-sm" size="md">Restaurants</Button>
          </Link>
          <Link to="/cart" onClick={onClose}>
            <Button variant="outline" className="w-full text-sm" size="md">Cart ({cartItemCount})</Button>
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="border-t border-gray-100 pt-3 space-y-2">
            <div className="flex items-center gap-3 px-2">
              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-sm font-bold">{user?.name}</p>
                <p className="text-xs text-text-secondary">{user?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/orders" onClick={onClose}>
                <Button variant="ghost" className="w-full text-sm" size="sm">My Orders</Button>
              </Link>
              <Button variant="danger" className="w-full text-sm" size="sm" onClick={() => { logout(); onClose(); }}>Logout</Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link to="/login" onClick={onClose}>
              <Button variant="ghost" className="w-full text-sm" size="md">Login</Button>
            </Link>
            <Link to="/register" onClick={onClose}>
              <Button className="w-full text-sm" size="md">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
