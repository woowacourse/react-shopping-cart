export const PAGES = {
  HOME: {
    NAME: '홈',
    ADDRESS: '/',
  },
  PRODUCT: {
    NAME: '상품목록',
    ADDRESS: '/products',
  },
  CART: {
    NAME: '장바구니',
    ADDRESS: '/cart',
  },
  CHECKOUT: {
    NAME: '주문/결제',
    ADDRESS: '/checkout',
  },
  ORDERS: {
    NAME: '주문목록',
    ADDRESS: '/orders',
  },
};

export const HEADER = {
  APP_TITLE: 'WOOWA SHOP',
  NAV_LIST: [PAGES.CART, PAGES.ORDERS],
};

export const UNIT = {
  MONEY: '원',
  AMOUNT: '개',
};

export const SNACKBAR_DURATION = 3000;
export const PRODUCTS_PER_PAGE = 12;
