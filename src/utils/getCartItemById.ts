import type { CartItemType } from "../types/response";

export const getCartItemById = (cartData: CartItemType[], cartId: number) => {
  return cartData.find((item) => item.id === cartId);
};
