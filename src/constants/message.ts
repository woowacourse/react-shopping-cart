const ALERT_MESSAGE_MAX_NUM = 3;
const ALERT_MESSAGE_DURATION = 3000;

const ERROR_MESSAGE = {
  API_CALL: "Api Call Error",
  BAD_RESPONSE: "요청하신 동작을 수행할 수 없습니다.",
};

const SUCCESS_MESSAGE = {
  POST_CART: "상품을 장바구니에 담았습니다.",
  DELETE_CART: "상품을 장바구니에서 제거했습니다.",
  POST_ORDER: "주문을 완료했습니다.",
};

const CONFIRM_MESSAGE = {
  DELETE: "정말로 제거하시겠습니까?"
};

export { ALERT_MESSAGE_MAX_NUM, ALERT_MESSAGE_DURATION, ERROR_MESSAGE, SUCCESS_MESSAGE, CONFIRM_MESSAGE };