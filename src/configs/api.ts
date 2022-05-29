import { Routes } from '../types';

const SERVER_URL = 'https://json-server-shopping-cart.herokuapp.com';
const ROUTES = {
  CART: '/cart',
  PRODUCTS: '/products',
} as const;

const API = Object.entries(ROUTES).reduce<Record<string, string>>(
  (obj, [key, value]) => ({
    ...obj,
    [key]: `${SERVER_URL}${value}`,
  }),
  {}
) as Routes<typeof ROUTES>;

export default API;
