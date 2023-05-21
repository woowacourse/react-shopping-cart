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

export { MONEY, ZERO, API, FETCH };
