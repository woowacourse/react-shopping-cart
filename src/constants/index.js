export const BASE_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-shoppingcart-server.herokuapp.com"
    : "dev";

export const SERVER_PATH = {
  PRODUCT_LIST: "/products",
  CART_LIST: "/carts",
};

export const ROUTES = {
  ROOT: "/",
  PRODUCT_LIST: "/product-list",
  PRODUCT_DETAIL: "/product-detail",
  PRODUCT_CART: "/product-cart",
  PRODUCT_ORDER_LIST: "/product-order-list",
};

export const LOCAL_STORAGE_CART_LIST_KEY = "CART_LIST";
