import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWalletStore = create(
  persist(
    (set, get) => ({
      coins: 0,
      scratchCards: [], // { id: string, amount: number, isScratched: boolean, date: string }

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
      
      deductCoins: (amount) => set((state) => ({ 
        coins: Math.max(0, state.coins - amount) 
      })),

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
