export const URL = {
  CART_ITEMS: '/cart-items',
  QUANTITY_TO_CHANGE: (id: number) => `/cart-items/${id}`,
  DELETE_ITEMS: (id: number) => `/cart-items/${id}`,
  ORDER_ITEMS: '/orders',
  COUPON: '/coupons',
} as const;

export const KEY = {
  CART_ITEMS: 'cartItems',
  PRICE_INFO: 'priceInfo',
  ORDER_INFO: 'orderInfo',
  SHIPPING_FEE: 'shippingFee',
  SELECTED_COUPONS: 'selectedCoupons',
  QUANTITY_STATE: 'quantityState',
  MODAL_DISCOUNT: 'modalDiscount',
  ORDER_DISCOUNT: 'orderDiscount',
  SPECIAL_AREA_STATE: 'specialAreaState',
  IS_OVER_SHIPPING_FEE_FREE: 'isOverShippingFeeFree',
  ORDER_TOTAL: 'orderTotal',
} as const;

export const ROUTER_URL = {
  MAIN: '/',
  ORDER_INFO: '/order-info',
  ERROR: '/error',
  PAYMENT_INFO: '/payment-info',
} as const;

export const ORDER = {
  MINIMUM_QUANTITY: 1,
  BASIC_SHIPPING_FEE: 3000,
  SHIPPING_FREE_PRICE: 100000,
  SPECIAL_AREA_ADDITIONAL_SHIPPING_FEE: 3000,
} as const;

export const COUPON = {
  BOGO_BUY_QUANTITY: 2,
  BOGO_GET_QUANTITY: 1,
  MAX_APPLICABLE_COUNT: 2,
} as const;

export const COUPON_DISCOUNT_TYPE = {
  FREE_SHIPPING: 'freeShipping',
  BUY_X_GET_Y: 'buyXgetY',
  FIXED: 'fixed',
  PERCENTAGE: 'percentage',
};
