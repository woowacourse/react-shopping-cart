export const LOCAL_STORAGE_KEY = Object.freeze({
  CART_ITEM: 'cart-items',
});

export const FETCH_METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

export const TOAST_TYPE = Object.freeze({
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
});

export const MESSAGE = Object.freeze({
  ADD_CART_SUCCESSFUL: '장바구니에 추가되었습니다.',
  DELETE_CART_SUCCESSFUL: '장바구니에서 삭제하였습니다.',
  ADD_CART_FAILED: '장바구니에 추가하는 과정에서 에러가 발생했습니다.',
  DELETE_CART_FAILED: '장바구니에 삭제하는 과정에서 에러가 발생했습니다.',
  MUTATE_CART_FAILED: '수량을 바꾸는 과정에서 에러가 발생하였습니다.',
  PRODUCT_GET_FAILED: '제품 목록을 불러오는 과정에서 문제가 생겼습니다.',
  RESPONSE_NOT_OKAY: '응답이 온전하지 않습니다.',
});

export const ROUTE_PATH = Object.freeze({
  DEFAULT: '/',
  CART: '/cart',
});

export const PARCEL_PRICE = 3000;
