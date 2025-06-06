export const PAGE_URL = {
  HOME: "/",
  ORDER_CONFIRMATION: "/order-confirmation",
  ORDER_COMPLETE: "/order-complete",
  NOT_FOUND: "*",
};

const isLocalHost = process.env.NODE_ENV === "development";

export const BASE_NAME = isLocalHost ? "/" : "/react-shopping-cart";
