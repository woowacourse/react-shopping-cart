const ZERO = 0;
const MONEY = {
  DELIVERY: 3000,
  ZERO: ZERO,
} as const;

const API = {
  CART_ITEMS: "/cart-items",
  PRODUCTS: "/products",
} as const;

const FETCH = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

const ERROR_MESSAGE = {
  PRODUCT: "상품 목록을 불러오지 못했어요!",
  SHOPPING_LIST: "장바구니 목록을 불러오지 못했어요!",
  ADD_TO_CART: "장바구니에 물건이 추가되지 않았어요!",
  DELETE_TO_CART: "장바구니 물건이 삭제되지 않았어요!",
} as const;
export { MONEY, ZERO, API, FETCH, ERROR_MESSAGE };
