import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Search, ChevronRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useLocationStore } from '../../store/locationStore';
import { cn } from '../../utils/cn';

const MAJOR_CITIES = [
  { name: 'Delhi', address: 'New Delhi, India', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', address: 'Mumbai, Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Bangalore', address: 'Bengaluru, Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Pune', address: 'Pune, Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Hyderabad', address: 'Hyderabad, Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', address: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', address: 'Kolkata, West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Ahmedabad', address: 'Ahmedabad, Gujarat', lat: 23.0225, lng: 72.5714 },
];

const LocationModal = ({ isOpen, onClose }) => {
  const { currentLocation, setLocation, detectLocation } = useLocationStore();
  const [search, setSearch] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const filteredCities = MAJOR_CITIES.filter(city => 
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDetect = async () => {
    setIsDetecting(true);
    try {
      await detectLocation();
      onClose();
    } catch (err) {
      alert('Could not detect location. Please select manually.');
    } finally {
      setIsDetecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-gray-50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-[#1C1C1C]">Select Location</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search for your city..." 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all font-bold placeholder:font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
            {/* Detect Location */}
            <button 
              onClick={handleDetect}
              disabled={isDetecting}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border-2 border-primary/10 text-primary hover:bg-primary/10 transition-all group"
            >
              <div className={cn(
                "h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0",
                isDetecting && "animate-spin"
              )}>
                <Navigation size={24} strokeWidth={2.5} />
              </div>
              <div className="text-left flex-1">
                <p className="font-black text-sm">Detect current location</p>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Using GPS</p>
              </div>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* City List */}
            <div>
              <p className="text-[10px] font-black text-[#686B78] uppercase tracking-[0.2em] mb-4 ml-2">Popular Cities</p>
              <div className="grid grid-cols-1 gap-2">
                {filteredCities.map((city) => {
                  const isSelected = currentLocation?.name === city.name;
                  return (
                    <button
                      key={city.name}
                      onClick={() => {
                        setLocation(city);
                        onClose();
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                        isSelected ? "bg-primary/5 border-2 border-primary/20" : "hover:bg-gray-50 border-2 border-transparent"
                      )}
                    >
                      <div className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                        isSelected ? "bg-white text-primary shadow-sm" : "bg-gray-50 text-gray-400"
                      )}>
                        <MapPin size={20} />
                      </div>
                      <div className="text-left flex-1">
                        <p className={cn("font-bold text-sm", isSelected ? "text-[#1C1C1C]" : "text-[#686B78]")}>
                          {city.name}
                        </p>
                        <p className="text-[10px] font-medium text-gray-400">{city.address}</p>
                      </div>
                      {isSelected && <Check size={20} className="text-primary" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </AnimatePresence>
  );
};

export default LocationModal;
