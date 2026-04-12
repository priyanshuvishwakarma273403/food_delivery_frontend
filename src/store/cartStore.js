import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,

      addItem: (item, restaurantId) => set((state) => {
        // If adding from a different restaurant, clear cart first (or handle warning)
        if (state.restaurantId && state.restaurantId !== restaurantId) {
          // You might want to handle this with a modal in UI
          return {
            items: [{ ...item, quantity: 1 }],
            restaurantId: restaurantId,
          };
        }

        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }

        return {
          items: [...state.items, { ...item, quantity: 1 }],
          restaurantId: restaurantId,
        };
      }),

      removeItem: (itemId) => set((state) => {
        const newItems = state.items.filter((i) => i.id !== itemId);
        return {
          items: newItems,
          restaurantId: newItems.length === 0 ? null : state.restaurantId,
        };
      }),

      updateQuantity: (itemId, quantity) => set((state) => {
        if (quantity <= 0) {
          const newItems = state.items.filter((i) => i.id !== itemId);
          return {
            items: newItems,
            restaurantId: newItems.length === 0 ? null : state.restaurantId,
          };
        }
        return {
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        };
      }),

      clearCart: () => set({ items: [], restaurantId: null }),

      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      
      getTotalAmount: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
