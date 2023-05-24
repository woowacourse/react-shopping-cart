const PATH = {
  HOME: '/',
  CART: '/shopping-cart',
};

const QUANTITY = Object.freeze({
  MAX: 99,
  MIN: 1,
});

const DELIVERY_CHARGE = 3000;

const SKELETON_LENGTH = 12;

const FETCH_METHOD = Object.freeze({
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

const FETCH_URL = Object.freeze({
  CART_ITEMS: '/cart-items',
  PRODUCTS: '/products',
});

const RECOIL_KEY = {
  CART_STATE: 'cartState',
  CART_SIZE_VALUE: 'cartSizeValue',
  CART_ITEM_VALUE: 'cartItemValue',

  CHECKED_STATE: 'checkedState',

  TOTAL_PRODUCT_PRICE_VALUE: 'totalProductPriceValue',
};

const LOCAL_STORAGE_KEY = {
  CHECKED_STATE: 'checkedProductInCart',
  CART_STATE: 'cartState',
};

export {
  PATH,
  QUANTITY,
  DELIVERY_CHARGE,
  SKELETON_LENGTH,
  FETCH_METHOD,
  FETCH_URL,
  RECOIL_KEY,
  LOCAL_STORAGE_KEY,
};
