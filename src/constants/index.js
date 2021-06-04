export const ROUTE = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product-detail',
  CART: '/cart',
  ORDER_PAYMENT: '/order-payment',
  COMPLETED_ORDER: '/completed-order',
};

export const PRODUCT = {
  QUANTITY: {
    MIN: 1,
    MAX: 100,
  },
};

export const MESSAGE = {
  PRODUCTS: {
    ADD_TO_CART_CONFIRM: '해당 상품을 장바구니에 추가하시겠습니까?',
    ADD_TO_CART_ALERT: '장바구니에 추가되었습니다.',
  },
  CART: {
    CHECK_PRODUCT_REQUEST: '주문할 상품을 선택해 주세요.',
    DELETE_FROM_CART_CONFIRM: '선택하신 상품을 장바구니에서 삭제하시겠습니까?',
  },
};

export const ERROR = {
  UNKNOWN: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};
