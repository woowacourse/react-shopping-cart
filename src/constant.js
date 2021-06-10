export const NUMBER = {
  ITEM_MINIMUM_COUNT: 1,
};

export const MESSAGE = {
  UNDER_MINIMUM_COUNT_LIMIT: `수량은 ${NUMBER.ITEM_MINIMUM_COUNT}개 이상이어야 합니다.`,
  ALREADY_IN_CART: '이미 장바구니에 추가된 상품입니다.',
  NOT_FOUND_PAGE: '죄송합니다. 페이지가 없거나 오류가 발생하였습니다.',
};

export const COLOR = {
  CYAN: {
    400: '#2ac1bc',
    600: '#1c827f',
  },
  GRAY: {
    300: '#DDDDDD',
    400: '#CCCCCC',
    500: '#BBBBBB',
    600: '#AAAAAA',
    700: '#888888',
    800: '#707a7a',
    900: '#333333',
  },
  WHITE: {
    300: '#f6f6f6',
    400: '#FFFFFF',
  },
  RED: {
    300: '#ff4d4f',
  },
};

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEED: 'succeed',
  FAILED: 'failed',
};

export const PAGE_TITLE = {
  PAYMENT: '주문/결제',
  ORDER_LIST: '주문목록',
  CART: '장바구니',
};

export const LOADING_MESSAGE = {
  LOADING: '로딩중 . . . 🏃‍♂️ 🏃‍♂️ 🏃‍♂️',
  PRODUCT_LIST: '상품목록을 불러오는 중입니다.',
  ORDER_LIST: '주문 목록을 불러오는 중입니다.',
  GET_CART_ITEMS: '장바구니 아이템들을 불러오는 중입니다',
};
