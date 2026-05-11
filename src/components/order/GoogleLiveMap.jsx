import { GoogleMap, useJsApiLoader, Marker, Polyline, OverlayView } from '@react-google-maps/api';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Navigation, Star } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Premium Minimal Map Theme
const mapStyles = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] }
];

const GoogleLiveMap = ({ riderPos, restaurantPos, userPos }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState(null);
  const [lineOffset, setLineOffset] = useState(0);

  // Animate the polyline dots for flowing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLineOffset(prev => (prev + 1) % 20);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(riderPos);
    bounds.extend(userPos);
    bounds.extend(restaurantPos);
    map.fitBounds(bounds);
    setMap(map);
  }, [riderPos, userPos, restaurantPos]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const lineOptions = useMemo(() => ({
    strokeColor: "#E23744",
    strokeOpacity: 0,
    strokeWeight: 4,
    icons: [{
      icon: {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4,
        strokeWeight: 2,
        strokeColor: '#E23744'
      },
      offset: `${lineOffset}px`,
      repeat: '20px'
    }],
  }), [lineOffset]);

  if (!isLoaded) return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 animate-pulse">
       <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full h-full relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={riderPos}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: false,
          gestureHandling: 'greedy'
        }}
      >
        {/* Animated Polyline Path */}
        <Polyline
          path={[restaurantPos, riderPos, userPos]}
          options={lineOptions}
        />

        {/* Restaurant Marker */}
        <Marker 
          position={restaurantPos} 
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/3170/3170733.png',
            scaledSize: new window.google.maps.Size(35, 35),
            anchor: new window.google.maps.Point(17, 35)
          }}
        />

        {/* User Marker */}
        <Marker 
          position={userPos} 
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40)
          }}
        />

        {/* Pulsing Rider Marker using OverlayView */}
        <OverlayView
          position={riderPos}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            {/* Pulsing Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full animate-ping opacity-75" />
              <div className="absolute w-10 h-10 bg-primary/30 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }} />
            </div>
            
            {/* Rider Icon */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="relative z-10 bg-white p-1.5 rounded-full shadow-2xl border-2 border-primary"
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png" 
                alt="Rider" 
                className="w-8 h-8 object-contain"
              />
            </motion.div>
          </div>
        </OverlayView>

      </GoogleMap>

      {/* Floating Status UI */}
      <AnimatePresence>
        <div className="absolute bottom-10 left-6 right-6 z-10">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/90 backdrop-blur-xl p-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-5">
               <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                  <div className="relative">
                    <div className="h-3 w-3 bg-white rounded-full animate-ping opacity-75" />
                    <div className="absolute inset-0 h-3 w-3 bg-white rounded-full" />
                  </div>
               </div>
               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Your Delivery Partner</p>
                 <div className="flex items-center gap-2">
                   <p className="font-black text-xl text-[#1C1C1C]">Rahul Sharma</p>
                   <span className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                     <Star size={10} fill="currentColor" /> 4.9
                   </span>
                 </div>
               </div>
            </div>
            
            <div className="h-12 w-[2px] bg-gray-100 rounded-full" />
            
            <div className="text-right">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Arriving In</p>
               <p className="font-black text-2xl text-[#1C1C1C]">~ 12 Mins</p>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Speed Dial/Actions */}
      <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-12 w-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center text-primary border border-white/20"
        >
          <Phone size={20} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-12 w-12 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center text-text-primary border border-white/20"
        >
          <Navigation size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default GoogleLiveMap;
