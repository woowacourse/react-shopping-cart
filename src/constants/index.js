export const ACTION_TYPE = {
  PRODUCTS: {
    FETCH_PRODUCTS: 'products/patchProducts',
    ADD_TO_CART: 'products/addToCart',
    INCREASE_QUANTITY: 'products/increaseQuantity',
    DECREASE_QUANTITY: 'products/decreaseQuantity',
    TOGGLE_CHECKED: 'products/toggleChecked',
    TOGGLE_ENTIRE_CHECKED: 'products/toggleEntireChecked',
    DELETE_CHECKED: 'products/deleteCheckedProducts',
    DELETE: 'products/deleteProduct',
  },
  ORDER: {
    ADD_TO_ORDER_LIST: 'orders/addToOrderList',
  },
};

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
  },
};

export const ERROR = {
  UNKNOWN: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
};
