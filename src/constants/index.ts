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

export const ERROR_MESSAGE = {
  400: '잘못된 요청으로 서버에서 해당 작업을 수행할 수 없습니다. 요청 형식을 다시 확인해주세요.',
  401: '인증 후 다시 시도해주세요.',
  403: '해당 콘텐츠에 접근할 권리가 없습니다. 관리자라면 인증을 시도해주세요.',
  404: '요청받은 페이지를 찾을 수 없습니다. 주소가 정확한지 확인해주세요.',
  500: '처리할 수 없는 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  default: '서버 내부에서 오류가 발생했습니다. 해당 오류가 지속적으로 발생한다면 관리자에게 문의해주세요.',
} as const;
