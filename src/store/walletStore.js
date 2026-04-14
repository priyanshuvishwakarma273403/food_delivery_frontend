import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWalletStore = create(
  persist(
    (set, get) => ({
      coins: 0,
      isApplyingCoins: false,
      scratchCards: [], // { id: string, amount: number, isScratched: boolean, date: string }

      // Fetch Real coins from Backend
      fetchCoins: async (userId) => {
        if (!userId) return;
        try {
          // Note: In real prod, this should have Authorization header
          const response = await fetch(`/api/wallets/user/${userId}`);
          if (response.ok) {
            const data = await response.json();
            set({ coins: data.balance || 0 });
          }
        } catch (error) {
          console.error("Failed to sync coins with server:", error);
        }
      },

      addCoinsLocal: (amount) => set((state) => ({ coins: state.coins + amount })),
      
      toggleApplyingCoins: () => set((state) => ({ isApplyingCoins: !state.isApplyingCoins })),

      addScratchCard: () => {
        const amount = Math.floor(Math.random() * 50) + 10; // Random coins between 10-60
        const newCard = {
          id: Math.random().toString(36).substring(7),
          amount,
          isScratched: false,
          date: new Date().toISOString()
        };
        set((state) => ({ scratchCards: [newCard, ...state.scratchCards] }));
        return newCard;
      },

      scratchCard: (id) => set((state) => {
        const card = state.scratchCards.find(c => c.id === id);
        if (card && !card.isScratched) {
          return {
            coins: state.coins + card.amount,
            scratchCards: state.scratchCards.map(c => 
              c.id === id ? { ...c, isScratched: true } : c
            )
          };
        }
        return state;
      })
    }),
    {
      name: 'wallet-storage',
    }
  )
);
