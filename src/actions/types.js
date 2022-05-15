const createAsyncAction = (actionName) => ({
  SUCCESS: `${actionName}_성공`,
  FAILURE: `${actionName}_실패`,
});

const 상품리스트_불러오기_액션 = createAsyncAction('상품리스트_불러오기');

const 장바구니_액션 = {
  ADD_CART: '장바구니에 상품을 추가합니다.',
};

const 스낵바_액션 = {
  PUSH_MESSAGE: '스낵바에 메시지를 푸시합니다.',
  HIDE_MESSAGE: '스낵바가 사라집니다.',
};

export { 상품리스트_불러오기_액션, 장바구니_액션, 스낵바_액션 };
