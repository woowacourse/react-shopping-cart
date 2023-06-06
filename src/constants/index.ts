const PATH = Object.freeze({
  HOME: '/',
  CART: '/shopping-cart',
});

const QUANTITY = Object.freeze({
  MAX: 99,
  MIN: 1,
});

const DELIVERY_CHARGE = 3000;

const SKELETON_LENGTH = 16;

const FETCH_URL = Object.freeze({
  CART_ITEMS: '/cart-items',
  PRODUCTS: '/products',
});

const LOCAL_STORAGE_KEY = Object.freeze({
  CART_STATE: 'cartState',
});

export { PATH, QUANTITY, DELIVERY_CHARGE, SKELETON_LENGTH, FETCH_URL, LOCAL_STORAGE_KEY };
