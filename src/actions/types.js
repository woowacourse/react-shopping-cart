const PRODUCTS_ACTIONS = {
  UPDATE_PRODUCT_LIST_SUCCESS: Symbol('상품 목록을 성공적으로 불러와 업데이트합니다.'),
  UPDATE_PRODUCT_LIST_FAILURE: Symbol(
    '상품 목록을 불러오는데 실패하여 오류 상태를 업데이트합니다.',
  ),
};

const CARTS_ACTIONS = {
  ADD_CART_LIST: Symbol('장바구니에 상품을 추가합니다.'),
};

export { PRODUCTS_ACTIONS, CARTS_ACTIONS };
