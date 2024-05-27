export const SHIPPING_CONSTANT = {
  FREE_CRITERIA: 100_000,
  FEE: 3_000,
  EXTRA_FEE: 3_000,
};

export const LOCAL_STORAGE_KEY = "itemCheckedMap";

export const COUPON_DISCOUNT_TYPE = {
  Percentage: "percentage",
  Fixed: "fixed",
  BuyXgetY: "buyXgetY",
  FreeShipping: "freeShipping",
} as const;
