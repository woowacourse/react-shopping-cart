export const COUPON_DISCOUNT_TYPE = {
  percentage: { name: 'percentage', priority: 1 },
  buyXgetY: { name: 'buyXgetY', priority: 2 },
  fixed: { name: 'fixed', priority: 3 },
  freeShipping: { name: 'freeShipping', priority: 4 },
} as const;
