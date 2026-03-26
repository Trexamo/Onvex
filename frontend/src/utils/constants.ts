export const APP_NAME = 'Logzz Marketplace';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const STORAGE_KEYS = {
  TOKEN: '@logzz:token',
  USER: '@logzz:user',
  CART: '@logzz:cart',
  THEME: '@logzz:theme',
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  AFFILIATE: 'affiliate',
  ADMIN: 'admin',
};
