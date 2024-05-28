export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_URL = {
  cartItems: API_BASE_URL + "/cart-items",
  orders: API_BASE_URL + "/orders",
  product: API_BASE_URL + "/products",
  coupons: API_BASE_URL + "/coupons",
  cartItemsWithId: (cartItemId: number) => API_URL.cartItems + `/${cartItemId}`,
};
