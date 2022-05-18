export const BASE_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-shoppingcart-server.herokuapp.com"
    : "dev";
export const PRODUCT_LIST_PATH = "/products";

export const ROUTES = {
  ROOT: "/",
  PRODUCT_LIST: "/product-list",
  PRODUCT_DETAIL: "/product-detail",
  PRODUCT_CART: "/product-cart",
  PRODUCT_ORDER_LIST: "/product-order-list",
};
