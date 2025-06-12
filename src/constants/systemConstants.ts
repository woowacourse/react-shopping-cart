export const FEE = {
  DELIVERY_FEE: 3000,
  DELIVERY_FEE_FREE: 0,
  DELIVERY_FEE_STANDARD: 100000,
  DELIVERY_FEE_REMOTE_AREA: 3000,
} as const;

export const ROUTE = {
  CART: "/",
  ORDER_COMPLETE: "/order-complete",
  ORDER_CONFIRMATION: "/order-confirmation",
};

export const COUPON_LIMIT = 2;

export const STORAGE_KEY = {
  CHECKED_CART_ITEMS: "checkedCartItems",
};
