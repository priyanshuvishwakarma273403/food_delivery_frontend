import apiClient from './axios';

export const blogService = {
  getAllBlogs: async () => {
    const response = await apiClient.get('/blogs');
    return response.data;
  },
  
  getBlogById: async (id) => {
    const response = await apiClient.get(`/blogs/${id}`);
    return response.data;
  },

  getRecentBlogs: async (limit = 3) => {
    const response = await apiClient.get(`/blogs/recent?limit=${limit}`);
    return response.data;
  }
};
