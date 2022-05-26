const SERVER_PATH = {
  PRODUCTS: '/products',
  CART: '/cart',
};

const ROUTES_PATH = {
  HOME: '/',
  DETAIL: '/product-detail/:id',
  DETAIL_LINK: '/product-detail/',
  CART: '/shopping-cart',
};

const SIZE = {
  LARGE: 'large',
  MIDDLE: 'middle',
};

const MESSAGE = {
  ADD: '🧺 장바구니에 추가 되었습니다. 🧺',
  REMOVE: '장바구니에서 제거 되었습니다.',
  CHECK_DELETE: '🗑 정말로 삭제하시겠습니까? 🗑',
};

export { SERVER_PATH, ROUTES_PATH, SIZE, MESSAGE };
