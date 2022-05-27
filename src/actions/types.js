const createAsyncAction = (actionName) => ({
  SUCCESS: `${actionName}_성공`,
  FAILURE: `${actionName}_실패`,
  PENDING: `${actionName}_요청`,
});

const 상품리스트_불러오기_액션 = createAsyncAction('상품리스트_불러오기');
const 상품_불러오기_액션 = createAsyncAction('상품_불러오기');

const 장바구니_액션 = {
  ADD_NEW_PRODUCT: '장바구니에 새로운 상품을 추가합니다.',
  ADD_EXIST_PRODUCT: '장바구니에 존재하는 상품을 추가합니다.',
  DELETE_PRODUCT: '장바구니에 존재하는 상품을 삭제합니다.',
  MODIFY_PRODUCT_COUNT: '장바구니 상품의 구매 수량을 변경합니다',
};

const 스낵바_액션 = {
  PUSH_MESSAGE: '스낵바에 메시지를 푸시합니다.',
  HIDE_MESSAGE: '스낵바가 사라집니다.',
};

export { 상품리스트_불러오기_액션, 상품_불러오기_액션, 장바구니_액션, 스낵바_액션 };
