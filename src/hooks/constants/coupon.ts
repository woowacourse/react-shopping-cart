export const COUPON_DISCOUNT_TYPE_NAME = {
  percentage: 'percentage',
  buyXgetY: 'buyXgetY',
  fixed: 'fixed',
  freeShipping: 'freeShipping',
} as const;

export const COUPON_DISCOUNT_TYPE_PRIORITY = {
  percentage: 1,
  buyXgetY: 2,
  fixed: 3,
  freeShipping: 4,
};
