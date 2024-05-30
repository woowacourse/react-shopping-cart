export const STORAGE = {
  checkedCartItems: 'checkedCartItems',
} as const;

export const SHIPPING_COST = {
  basic: 3_000,
  remote: 6_000,
  freeShippingMinimumAmount: 100_000,
} as const;

export const COUPON_APPLICABLE_LIMIT = 2;

export const ORDER_QUANTITY_PER_ITEM = {
  min: 1,
  max: 100,
} as const;
