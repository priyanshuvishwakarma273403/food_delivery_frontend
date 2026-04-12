import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <span className="text-white font-black text-2xl tracking-tighter">AG</span>
              </div>
              <span className="text-2xl font-black text-primary">AntiGravity</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Experience the best food delivery at your doorstep with lightning speed and premium quality.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-text-secondary hover:bg-primary hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/restaurants" className="text-text-secondary text-sm hover:text-primary transition-colors">Find Restaurants</Link></li>
              <li><Link to="/orders" className="text-text-secondary text-sm hover:text-primary transition-colors">My Orders</Link></li>
              <li><Link to="/about" className="text-text-secondary text-sm hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-text-secondary text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-text-secondary text-sm hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/privacy" className="text-text-secondary text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-text-secondary text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/delivery" className="text-text-secondary text-sm hover:text-primary transition-colors">Become a Delivery Partner</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-text-primary mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-secondary">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>123 Food Street, Culinary Quarter,<br />New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 1800-FOOD-LIFE</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-text-secondary">
                <Mail size={18} className="text-primary shrink-0" />
                <span>support@antigravity.food</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} AntiGravity Food Delivery. All rights reserved.
          </p>
          <div className="flex gap-6">
             <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
