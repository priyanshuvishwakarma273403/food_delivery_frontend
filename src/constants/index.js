export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8080/ws';

export const ORDER_STATUS = {
  PLACED: 'PLACED',
  CONFIRMED: 'CONFIRMED',
  PREPARING: 'PREPARING',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
};

export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  ADMIN: 'ADMIN',
  DELIVERY_PARTNER: 'DELIVERY_PARTNER',
};

// Re-export from centralized data
export { CUISINE_CATEGORIES as CUISINES } from '../data/restaurants';
