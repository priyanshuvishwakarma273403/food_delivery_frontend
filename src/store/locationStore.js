import { create } from 'zustand';

export const useLocationStore = create((set) => ({
  address: null,
  coordinates: { lat: 28.6139, lng: 77.2090 }, // Default to Delhi
  city: 'Delhi',

  setLocation: (address, coordinates, city) => set({
    address,
    coordinates,
    city,
  }),

  setCoordinates: (coords) => set({ coordinates: coords }),
}));
