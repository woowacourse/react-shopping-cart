export const URLS = {
  CART_ITEMS: '/cart-items',
  QUANTITY_TO_CHANGE: (id: number) => `/cart-items/${id}`,
  DELETE_ITEMS: (id: number) => `/cart-items/${id}`,
};

export const KEYS = {
  CART_ITEMS: 'cartItems',
  PRICE_INFO: 'priceInfo',
  ORDER_INFO: 'orderInfo',
  QUANTITY_STATE: 'quantityState',
};

export const ROUTER_URLS = {
  MAIN: '',
  ORDER_INFO: '/order-info',
  ERROR: '/error',
};
