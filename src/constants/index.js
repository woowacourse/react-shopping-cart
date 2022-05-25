export const PATH = {
  ROOT: "/",
  PRODUCT_LIST: "/product-list",
  PRODUCT_DETAIL_WITH_ID: (id) => `/product-detail/${id}`,
  CART: "/cart",
  ORDER_LIST: "/order-list",
};

export const API_SERVER = {
  BASE_URL: "https://react-shoppingcart-server.herokuapp.com",
  PATH: {
    PRODUCTS: "/products",
    CART: "/cart",
  },
};

export const PRODUCT_QUANTITY_CONDITION = {
  MIN: 1,
  MAX: 20,
  STEP: 1,
};

export const REQUEST_METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
};

export const ACTION_SUCCESS_MESSAGE = {
  POST_CART_ITEM_SUCCESS_WITH_QUANTITY: (quantity) =>
    `${quantity}개의 상품을 장바구니에 담았습니다.`,
  DELETE_CART_ITEM_SUCCESS: "장바구니에서 상품을 삭제했습니다.",
};

export const ERROR_MESSAGE = {
  NO_ITEM_TO_ADD_TO_CART: "장바구니에 추가할 아이템이 없습니다.",
  OUT_OF_RANGE_QUANTITY: `장바구니에는 최소 ${PRODUCT_QUANTITY_CONDITION.MIN}개, 최대 ${PRODUCT_QUANTITY_CONDITION.MAX}개 담을 수 있습니다.`,
};
