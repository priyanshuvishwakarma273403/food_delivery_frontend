import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Custom icons
const riderIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const restaurantIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3170/3170733.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const homeIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/619/619153.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

const LiveMap = ({ riderPos, restaurantPos, userPos }) => {
  const polyline = [riderPos, restaurantPos, userPos];

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={riderPos} 
        zoom={14} 
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <RecenterMap position={riderPos} />

        <Marker position={restaurantPos} icon={restaurantIcon}>
          <Popup>Restaurant Location</Popup>
        </Marker>

        <Marker position={userPos} icon={homeIcon}>
          <Popup>Your Delivery Address</Popup>
        </Marker>

        <Marker position={riderPos} icon={riderIcon}>
          <Popup>Delivery Partner</Popup>
        </Marker>

        <Polyline positions={[riderPos, userPos]} color="#E23744" weight={3} dashArray="10, 10" />
      </MapContainer>
      
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
         <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-premium border border-white/20 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider text-text-primary">Live Tracking Active</span>
         </div>
      </div>
    </div>
  );
};

export default LiveMap;
