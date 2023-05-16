export const PRODUCT = {
  MIN_COUNT: 0,
  MAX_COUNT: 99,
} as const;

export const LOCAL_STORAGE_KEY = {
  CART: 'cart',
} as const;

export const URL = {
  PRODUCT_LIST: `${process.env.PUBLIC_URL}/mock/productList.json`,
} as const;
