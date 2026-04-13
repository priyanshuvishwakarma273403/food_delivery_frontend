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
  ChevronDown,
  Moon,
  Sun,
  Mic,
  Home,
  UtensilsCrossed,
  ClipboardList,
  UserCircle
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useLocationStore } from '../../store/locationStore';
import { useTheme } from '../../hooks/useTheme';
import Button from '../common/Button';
import { cn } from '../../utils/cn';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const { user, logout, isAuthenticated } = useAuthStore();
  const { items, toggleDrawer } = useCartStore();
  const { city } = useLocationStore();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [navigate]);

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
                className="bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-xl pl-10 pr-12 py-2.5 text-sm w-full outline-none transition-all dark:text-white"
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
          <div className="hidden md:flex items-center gap-2 shrink-0">
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
              <ShoppingCart size={20} className="text-text-primary dark:text-white" />
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

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1">
            <button 
              onClick={() => toggleDrawer(true)}
              className="relative p-2 rounded-lg"
            >
              <ShoppingCart size={20} className="text-text-primary" />
              {cartItemCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-primary text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-50 text-text-primary"
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

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 safe-pb">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: Home, label: 'Home', to: '/' },
            { icon: Search, label: 'Search', to: '/restaurants' },
            { icon: UtensilsCrossed, label: 'Food', to: '/restaurants' },
            { icon: ClipboardList, label: 'Orders', to: '/orders' },
            { icon: UserCircle, label: 'Profile', to: isAuthenticated ? '/orders' : '/login' },
          ].map((item, i) => (
            <Link key={i} to={item.to} className="flex flex-col items-center gap-0.5 text-text-secondary hover:text-primary transition-colors p-1">
              <item.icon size={20} />
              <span className="text-[9px] font-bold">{item.label}</span>
            </Link>
          ))}
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
