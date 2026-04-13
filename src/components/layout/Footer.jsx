import { Link } from 'react-router-dom';
import { Send, Camera, Globe, Play, Mail, Phone, MapPin } from 'lucide-react';
import { getTotalRestaurants, getTotalFoodItems } from '../../data/restaurants';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 md:pt-16 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="space-y-4 md:space-y-6 col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <span className="text-white font-black text-2xl tracking-tighter">T</span>
              </div>
              <span className="text-2xl font-black text-primary">Tomato</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              India's #1 food delivery platform with {getTotalRestaurants()}+ restaurants and {getTotalFoodItems()}+ dishes. Experience the best food at your doorstep.
            </p>
            <div className="flex gap-3 md:gap-4">
              {[Camera, Send, Globe, Play].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-xl bg-gray-50 text-text-secondary hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-4 md:mb-6 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/restaurants" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">Find Restaurants</Link></li>
              <li><Link to="/orders" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">My Orders</Link></li>
              <li><Link to="/about" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-4 md:mb-6 text-sm md:text-base">Support</h4>
            <ul className="space-y-3 md:space-y-4">
              <li><Link to="/faq" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/delivery" className="text-text-secondary text-xs md:text-sm hover:text-primary transition-colors">Become a Delivery Partner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-4 md:mb-6 text-sm md:text-base">Contact Us</h4>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-text-secondary">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span>123 Food Street, Nsp,<br />New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-text-secondary">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+91 9369420619</span>
              </li>
              <li className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-text-secondary">
                <Mail size={16} className="text-primary shrink-0" />
                <span>pv254424@tomato.food</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] md:text-xs text-text-secondary text-center md:text-left">
            © {new Date().getFullYear()} Tomato Food Delivery. All rights reserved. | India's Largest Food Platform
          </p>
          <div className="flex gap-4 md:gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-7 md:h-8" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-7 md:h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
