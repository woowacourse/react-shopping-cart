export const ERROR_MESSAGE = {
  SERVER_ERROR: '서버에 일시적인 문제가 생겼습니다.\n잠시 후에 다시 접속해 주세요.',
  AUTHENTICATION_FAILED: 'API 인증에 실패했습니다.\n관리자에게 문의해 주세요.',
  FETCHING_FAILED: '데이터를 불러오지 못했습니다.\n잠시 후에 다시 시도해 주세요.',
  NETWORK_DISCONNECTED: '네트워크 에러가 발생했습니다.\n인터넷 연결 상태를 확인해주세요.',
  UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다.\n잠시 후에 다시 시도해주세요.',
  ADD_TO_CART_FAILED: '장바구니에 상품을 추가하지 못했습니다.\n잠시 후 다시 시도해 주세요.',
  REMOVE_FROM_CART_FAILED: '장바구니에서 상품을 삭제하지 못했습니다.\n잠시 후 다시 시도해 주세요.',
  UPDATE_QUANTITY_FAILED:
    '장바구니에서 상품 수량을 변경하지 못했습니다.\n잠시 후 다시 시도해 주세요.',
} as const;
