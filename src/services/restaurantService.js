import apiClient from '../api/axios';

const restaurantService = {
  getAllRestaurants: async (params) => {
    const response = await apiClient.get('/restaurants', { params });
    return response.data;
  },
  getRestaurantById: async (id) => {
    const response = await apiClient.get(`/restaurants/${id}`);
    return response.data;
  },
  createRestaurant: async (data) => {
    const response = await apiClient.post('/restaurants', data);
    return response.data;
  },
  updateRestaurant: async (id, data) => {
    const response = await apiClient.put(`/restaurants/${id}`, data);
    return response.data;
  },
  deleteRestaurant: async (id) => {
    const response = await apiClient.delete(`/restaurants/${id}`);
    return response.data;
  },
  getMenuByRestaurantId: async (id) => {
    const response = await apiClient.get(`/menu/restaurant/${id}`);
    return response.data;
  },
  createMenuItem: async (restaurantId, data) => {
    const response = await apiClient.post(`/menu/restaurant/${restaurantId}`, data);
    return response.data;
  }
};

export default restaurantService;
