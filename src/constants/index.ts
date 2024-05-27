// 환경 변수
export const ENV = {
  API_URL: import.meta.env.VITE_BASE_URL,
  USER_ID: import.meta.env.VITE_USER_ID,
  USER_PASSWORD: import.meta.env.VITE_USER_PASSWORD,
};

// 경로 상수
export const PATHS = {
  BASE: "/",
  SHOPPING_CART: "/react-shopping-cart/",
  CART_ITEMS: "/cart-items",
  ORDER_CONFIRMATION: "/order-confirmation",
<<<<<<< HEAD
  PAYMENTS_CONFIRMATION: "/payments-confirmation",
  COUNTS: "/counts",
  COUPONS: "/coupons",
=======
  COUNTS: "/counts",
>>>>>>> 00kang
};

// 페이징 상수
export const PAGINATION = {
  DEFAULT_PAGE: 0,
  ITEM_LIMIT_PER_PAGE: 20,
};

// 카운터버튼 타입 상수
export const COUNTER_BUTTON_TYPES = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
} as const;

// 헤더 타입 상수
export const HEADER_TYPES = {
<<<<<<< HEAD
  SHOP: "SHOP",
  BACK: "BACK",
  NONE: "NONE",
=======
  SHOP: "shop",
  BACK: "back",
>>>>>>> 00kang
} as const;

// 에러 메시지 상수
export const ERROR_MESSAGES = {
  PLUS_CART_ITEM: "Failed to increase item quantity",
  MINUS_CART_ITEM: "Failed to decrease item quantity",
  FETCH_CART_ITEMS: "Failed to fetch cart items",
  FETCH_CART_ITEM_COUNTS: "Failed to fetch cart item counts",
  FETCH_CART_ITEM_QUANTITY: "Failed to fetch cart item quantity",
  ADD_CART_ITEM: "Failed to add cart item",
  DELETE_CART_ITEM: "Failed to delete cart item",
<<<<<<< HEAD
  FETCH_COUPONS: "Failed to fetch coupons",
=======
>>>>>>> 00kang
};

// 정보 메시지 상수
export const INFO_MESSAGES = {
  EMPTY_CART: "장바구니에 담은 상품이 없습니다.",
  FREE_DELIVERY: "총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.",
  CHECK_TOTAL_PRICE: "최종 결제 금액을 확인해 주세요.",
<<<<<<< HEAD
  COUPON_USAGE_LIMIT: "쿠폰은 최대 2개까지 사용할 수 있습니다.",
=======
>>>>>>> 00kang
};

// 배송비 관련 상수
export const DELIVERY = {
  FREE_THRESHOLD: 100000,
  FREE: 0,
  STANDARD: 3000,
<<<<<<< HEAD
  REGION_SPECIFIC: 6000,
=======
>>>>>>> 00kang
};

// 카트 관련 상수
export const CART = {
  EMPTY_THRESHOLD: 0,
  MINIMUM_QUANTITY: 1,
  QUANTITY_CHANGE_STEP: 1,
};

// 버튼 색 관련 상수
export const BUTTON_COLORS = {
  LIGHT: "LIGHT",
  DARK: "DARK",
} as const;
<<<<<<< HEAD

// 쿠폰 관련 상수
export const COUPON = {
  MAX_SELECTABLE_COUPONS: 2,
};
=======
>>>>>>> 00kang
