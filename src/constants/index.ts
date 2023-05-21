export const PRODUCT = {
  MIN_COUNT: 0,
  MAX_COUNT: 99,
} as const;

export const DELIVERY_FEE = 3000;
export const LOCAL_STORAGE_KEY = {
  CART: 'cart',
} as const;

export const URL = {
  PRODUCT_LIST: `${process.env.PUBLIC_URL}/mock/productList.json`,
} as const;

export const PRODUCTS_BASE_URL = '/api/products';
export const CART_BASE_URL = '/api/cart-items';
