export const PRODUCTS_BASE_URL = '/api/products';
export const CART_ITEMS_BASE_URL = '/api/cart-items';

export const LOCAL_STORAGE_CARTLIST_KEY = 'cartList';

export const ERROR_MESSAGE = {
  'default': 'error',
  '400': 'Bad Request: 잘못된 요청입니다.',
  '401': 'Unauthorized: 인증에 실패했습니다',
  '403': 'Forbidden: 해당 페이지에 접근할 수 없습니다.',
  '404': 'Not Found: 해당 경로를 찾을 수 없습니다.',
  '409': 'Confilct: 요청에 대해 충돌이 있습니다.',
  '405': 'Method Not Allowed: 관리자에게 문의해주세요.',
  '500': 'Internal Server Error: 서버에서 요청처리 중 에러가 발생했습니다.',
  '501': 'Service Unavailable: 서버가 일시적으로 요청을 처리할 수 없습니다.',
} as const;
