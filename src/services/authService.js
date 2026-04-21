import apiClient from '../api/axios';

const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  sendOtp: async (email) => {
    const response = await apiClient.post(`/auth/send-otp?email=${email}`);
    return response.data;
  },

  logout: async () => {
    // Backend logout if needed, usually just client side
    return { success: true };
  },
  
  googleLogin: async (idToken) => {
    const response = await apiClient.post('/auth/google', idToken, {
      headers: { 'Content-Type': 'text/plain' }
    });
    return response.data;
  }
};


export default authService;
