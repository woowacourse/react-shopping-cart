export const ALERT_MESSAGE = {
  OVER_MAX_QUANTITY: '한 계정당 한 품목을 99개 이하로 구입가능합니다.',
} as const;

export const SHOPPING_QUANTITY = {
  DEFAULT: 1,
  MAX: 99,
  MIN: 0,
} as const;

export const QUANTITY_CONTROL_BUTTON = {
  PLUS: 'plus',
  MINUS: 'minus',
} as const;

export const QUANTITY_CONTROL_UNIT = {
  INCREASE: 1,
  DECREASE: 1,
} as const;

export const BOX_SIZE = {
  xSmall: '16px',
  small: '24px',
  medium: '30px',
  large: '36px',
} as const;

export const FETCH_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export const FETCH_URL = {
  products: '/api/products',
  cartItems: '/api/cart-item',
};

export const DELIVERY_FEE = 3000;
