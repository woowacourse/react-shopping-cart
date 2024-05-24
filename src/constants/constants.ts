export const API_URLS = {
  PRODUCTS: '/products',
  CART_ITEMS: '/cart-items',
  QUANTITY_TO_CHANGE: (id: number) => `/cart-items/${id}`,
  DELETE_ITEMS: (id: number) => `/cart-items/${id}`,
};

export const RECOIL_KEYS = {
  CART_ITEMS: 'cartItems',
  PRICE_INFO: 'priceInfo',
  ORDER_INFO: 'orderInfo',
  SHIPPING_FEE: 'shippingFee',
  ISOLATED_REGION: 'isolatedRegion',
  DISCOUNT_AMOUNT: 'discountAmount',
  SELECTED_COUPONS: 'selectedCoupons',
  DISCOUNT_INFO: 'discountInfo',
};

export const ROUTER_URLS = {
  MAIN: '',
  ORDER_INFO: '/order-info',
  ADMIN: '/admin',
  PAYMENT_INFO: '/payment-info',
  ERROR: '/error',
};

export const ORDER = {
  SHIPPING_FEE: 3000,
  SHIPPING_FREE_PRICE: 100000,
};
