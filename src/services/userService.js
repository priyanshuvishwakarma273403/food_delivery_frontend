import apiClient from '../api/axios';

const userService = {
  getAllUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },
  updateUserRole: async (id, role) => {
    const response = await apiClient.patch(`/users/${id}/role?role=${role}`);
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  }
};

export default userService;
