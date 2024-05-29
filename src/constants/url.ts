const BASE_URL = import.meta.env.VITE_BASE_URL;

export const REQUEST_URL = {
  cartItems: `${BASE_URL}/cart-items`,
  updateItemQuantity: (cartId: number) => `${BASE_URL}/cart-items/${cartId}`,
  deleteItem: (cartId: number) => `${BASE_URL}/cart-items/${cartId}`,
  coupons: `${BASE_URL}/coupons`,
  orders: `${BASE_URL}/orders`,
};
