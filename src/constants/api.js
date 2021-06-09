export const BASE_URL = 'https://shopping-cart.techcourse.co.kr/api';

export const PATH = {
  PRODUCT_LIST: '/products',
  PRODUCT_ENTITY: (productId) => `/products/${productId}`,

  CART_LIST: (customerName) => `/customers/${customerName}/carts`,
  CART_ENTITY: (customerName, cartProductId) => `/customers/${customerName}/carts/${cartProductId}`,

  ORDER_LIST: (customerName) => `/customers/${customerName}/orders`,
  ORDER_ENTITY: (customerName, orderId) => `/customers/${customerName}/orders/${orderId}`,
};
