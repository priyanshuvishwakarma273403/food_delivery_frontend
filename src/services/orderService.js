import apiClient from '../api/axios';

const orderService = {
  getAllOrders: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },
  updateOrderStatus: async (id, status) => {
    const response = await apiClient.patch(`/orders/${id}/status?status=${status}`);
    return response.data;
  },
  getRestaurantOrders: async (restaurantId) => {
    const response = await apiClient.get(`/orders/restaurant/${restaurantId}`);
    return response.data;
  }
};

export default orderService;
