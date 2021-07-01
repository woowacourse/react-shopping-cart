const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';
const CUSTOMER_NAME = 'iborymagic';

export const API_URL = {
  PRODUCTS: `${BASE_URL}/products`,
  CART: `${BASE_URL}/customers/${CUSTOMER_NAME}/carts`,
  ORDERS: `${BASE_URL}/customers/${CUSTOMER_NAME}/orders`,
};
