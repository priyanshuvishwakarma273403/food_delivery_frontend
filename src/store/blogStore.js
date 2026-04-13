import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useBlogStore = create(
  persist(
    (set) => ({
      blogs: [
        {
          id: 1,
          title: 'Happy Diwali: Special Festive Offers!',
          content: 'The festival of lights is here! Enjoy exclusive up to 60% discounts on all traditional thalis and dessert boxes this week. Order now and celebrate with your loved ones!',
          image: 'https://images.unsplash.com/photo-1511556532299-8f660fc26c06?w=800',
          author: 'Admin',
          category: 'Festival',
          date: new Date().toISOString(),
          isDraft: false,
        },
        {
          id: 2,
          title: 'Top 5 Summer Coolers to Try',
          content: 'Beat the heat with our handpicked list of the best shakes, juices, and lassis from our top-rated partners. Stay hydrated and stay healthy!',
          image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7e?w=800',
          author: 'Admin',
          category: 'Health',
          date: new Date().toISOString(),
          isDraft: false,
        }
      ],
      addBlog: (blog) => set((state) => ({ blogs: [blog, ...state.blogs] })),
      updateBlog: (id, updatedBlog) => set((state) => ({
        blogs: state.blogs.map(b => b.id === id ? { ...b, ...updatedBlog } : b)
      })),
      deleteBlog: (id) => set((state) => ({
        blogs: state.blogs.filter(b => b.id !== id)
      })),
    }),
    {
      name: 'tomato-blogs',
    }
  )
);
