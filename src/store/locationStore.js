import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLocationStore = create()(
  persist(
    (set) => ({
      currentLocation: {
        name: 'Delhi',
        address: 'Connaught Place, New Delhi',
        lat: 28.6139,
        lng: 77.2090
      },
      savedAddresses: [],
      
      setLocation: (location) => set({ currentLocation: location }),
      
      addAddress: (address) => set((state) => ({ 
        savedAddresses: [...state.savedAddresses, address] 
      })),
      
      detectLocation: async () => {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
          }
          
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                // In a real app, we would use Reverse Geocoding API (Google/Mapbox)
                // For now, we simulate detecting a nearby major city
                const mockLocation = {
                  name: 'Mumbai',
                  address: 'Current Location, Mumbai, Maharashtra',
                  lat: latitude,
                  lng: longitude
                };
                set({ currentLocation: mockLocation });
                resolve(mockLocation);
              } catch (error) {
                reject(error);
              }
            },
            (error) => reject(error)
          );
        });
      }
    }),
    {
      name: 'location-storage',
    }
  )
);
