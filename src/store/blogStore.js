import { create } from 'zustand';
import { blogService } from '../api/blogService';

export const useBlogStore = create((set) => ({
  blogs: [],
  isLoading: false,
  error: null,

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await blogService.getAllBlogs();
      set({ blogs: response.data || [], isLoading: false });
    } catch (err) {
      set({ error: 'Failed to fetch blogs', isLoading: false });
    }
  },

  addBlog: (blog) => set((state) => ({ blogs: [blog, ...state.blogs] })),
  updateBlog: (id, updatedBlog) => set((state) => ({
    blogs: state.blogs.map(b => b.id === id ? { ...b, ...updatedBlog } : b)
  })),
  deleteBlog: (id) => set((state) => ({
    blogs: state.blogs.filter(b => b.id !== id)
  })),
}));

