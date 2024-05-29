import { PATH, fetchWithAuth } from "./fetchWithAuth";

import { CartItem } from "../types/cartItems";

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const response = await fetchWithAuth(PATH.cartItems, {
    method: "GET",
  });

  const data = await response.json();

  return data.content;
};

export const updateCartItemQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<void> => {
  await fetchWithAuth(`${PATH.cartItems}/${cartItemId}`, {
    method: "PATCH",
    body: { quantity },
  });
};

export const removeCartItem = async (cartItemId: number): Promise<void> => {
  await fetchWithAuth(`${PATH.cartItems}/${cartItemId}`, {
    method: "DELETE",
  });
};
