export const PRICE = {
  freeShippingMinAmount: 100000,
  shippingFee: {
    free: 0,
    basic: 3000,
  },
} as const;

export const QUANTITY = {
  min: 1,
  max: 100,
} as const;
