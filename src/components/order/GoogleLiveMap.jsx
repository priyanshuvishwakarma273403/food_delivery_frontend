import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Custom Silver/Dark Theme for Map
const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "elementType": "labels.icon",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [{ "color": "#f5f5f5" }]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#bdbdbd" }]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{ "color": "#eeeeee" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{ "color": "#e5e5e5" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#ffffff" }]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#757575" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{ "color": "#dadada" }]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#616161" }]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{ "color": "#e5e5e5" }]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [{ "color": "#eeeeee" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#c9c9c9" }]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{ "color": "#9e9e9e" }]
  }
];

const GoogleLiveMap = ({ riderPos, restaurantPos, userPos }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(riderPos);
    bounds.extend(userPos);
    map.fitBounds(bounds);
    setMap(map);
  }, [riderPos, userPos]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 animate-pulse rounded-3xl">
      <div className="text-center">
         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
         <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Loading Google Maps...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-premium border border-gray-100">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={riderPos}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'cooperative'
        }}
      >
        {/* Rider Marker */}
        <Marker 
          position={riderPos} 
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
            scaledSize: new window.google.maps.Size(45, 45),
            anchor: new window.google.maps.Point(22, 22)
          }}
          title="Delivery Partner"
        />

        {/* Restaurant Marker */}
        <Marker 
          position={restaurantPos} 
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/3170/3170733.png',
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40)
          }}
          title="Restaurant"
        />

        {/* Home Marker */}
        <Marker 
          position={userPos} 
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
            scaledSize: new window.google.maps.Size(40, 40),
            anchor: new window.google.maps.Point(20, 40)
          }}
          title="Home"
        />

        {/* Path tracking */}
        <Polyline
          path={[riderPos, userPos]}
          options={{
            strokeColor: "#E23744",
            strokeOpacity: 0.8,
            strokeWeight: 4,
            icons: [{
              icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 4 },
              offset: '0',
              repeat: '20px'
            }],
          }}
        />
      </GoogleMap>

      {/* Floating Status Overlay */}
      <div className="absolute top-6 left-6 right-6 z-10">
         <motion.div 
           initial={{ y: -20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-premium border border-gray-100 flex items-center justify-between"
         >
           <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                 <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Arriving in</p>
                <p className="font-black text-lg text-text-primary">12-15 Mins</p>
              </div>
           </div>
           <div className="h-10 w-[1px] bg-gray-100" />
           <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Distance left</p>
              <p className="font-black text-lg text-primary">2.4 KM</p>
           </div>
         </motion.div>
      </div>
    </div>
  );
};

export default GoogleLiveMap;
