export const ALERT_MESSAGES = {
  PRODUCT_ADDED: (count) => `${count}개가 장바구니에 추가되었습니다.`,
};

export const WARNING_MESSAGES = {
  PRODUCTS_DELETE: (count) => `${count}개의 상품을 삭제하시겠습니까?`,
  MIN_QUANTITY: '구입할 수 있는 최소 수량입니다.',
  MAX_QUANTITY: '구입할 수 있는 최대 수량입니다.',
};

export const ERROR_MESSAGES = {
  INVALID_PAGE: '😱 존재하지 상품 페이지입니다. 😱',
  SERVER_ERROR: '서버에서 오류가 발생했습니다! 잠시 후 다시 시도해주세요!',
  INVALID_REQUEST: '잘못된 요청입니다. 확인 후 다시 시도해주세요.',
  UNKNOWN:
    '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도하거나 관리자에게 문의해주세요',
};
