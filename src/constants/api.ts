const API_ENDPOINT = {
  PRODUCTS_GET: '/api/products',
  CART_GET: '/api/cart',
  CART_POST: '/api/cart/add',
  CART_PATCH: '/api/cart/change',
  CART_DELETE: '/api/cart/remove',
} as const;

const FETCH_DEFAULT_OPTION = {
  headers: {
    Accept: 'application/json',
  },
} as const;

const HTTP_STATUS_CODE = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

const HTTP_ERROR_MESSAGE = {
  [HTTP_STATUS_CODE.NOT_FOUND]: {
    HEADING: '페이지를 찾을 수 없습니다.',
    BODY: '페이지가 존재하지 않거나 삭제되어 찾을 수 없어요.',
    BUTTON: '홈으로 가기',
  },
  [HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR]: {
    HEADING: '현재 페이지를 표시할 수 없습니다.',
    BODY: `잠시 후 다시 시도해주세요.`,
    BUTTON: '새로고침',
  },
  [HTTP_STATUS_CODE.BAD_REQUEST]: {
    HEADING: '잘못된 요청입니다.',
    BODY: '확인 후 다시 시도해주세요.',
    BUTTON: '홈으로 가기',
  },
} as const;

export { API_ENDPOINT, FETCH_DEFAULT_OPTION, HTTP_STATUS_CODE, HTTP_ERROR_MESSAGE };
