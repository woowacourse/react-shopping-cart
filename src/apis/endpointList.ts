export const ORDER = {
  ORDER_LIST: '/orders',
};

export const COUPON = {
  COUPON_LIST: '/coupons',
};

export const CART_ITEM = {
  CART_ITEM_LIST: '/cart-items',
  cartItem: (cartItemId: number) => `/cart-items/${cartItemId}`,
};
