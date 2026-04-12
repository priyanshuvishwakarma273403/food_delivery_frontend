export const BASE_URL = 'http://localhost:8080/api';
export const WS_URL = 'http://localhost:8080/ws';

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

export const CUISINES = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Biryani', icon: '🍲' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Chicken', icon: '🍗' },
  { name: 'Chinese', icon: '🍜' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'South Indian', icon: '🍱' },
  { name: 'North Indian', icon: '🍛' },
];
