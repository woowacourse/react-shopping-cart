export const PAGE_URL = {
  home: "/",
  orderConfirm: "/order-confirm",
};

export const API_BASE_URL = import.meta.env.VITE_API_URL;

/**
 * 각 URL은 다음 요청에서 사용합니다.
 * cartItems: getCartItems
 * cartItemsWithId : patchCartItemQuantity, removeCartItem
 */
export const API_URL = {
  cartItems: API_BASE_URL + "/cart-items",
  cartItemsWithId: (cartItemId: number) =>
    API_BASE_URL + "/cart-items" + `/${cartItemId}`,
};
