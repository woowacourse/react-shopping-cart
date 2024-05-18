import { CartItem } from "@/types/cart";
import { API_URL, basicToken } from ".";
import { ErrorMessage } from "@/constants/error";

export async function getCartItems(): Promise<CartItem[]> {
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: basicToken },
  });

  if (!response.ok) {
    throw new Error(ErrorMessage.failGetCartList);
  }

  const data = await response.json();

  return data.content;
}

export async function patchCartItemQuantity(
  cartItemId: number,
  quantity: number
): Promise<boolean> {
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "PATCH",
    headers: {
      Authorization: basicToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(ErrorMessage.failPatchItemQuantity);
  }

  return response.ok;
}

export async function removeCartItem(cartItemId: number): Promise<boolean> {
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: basicToken,
    },
  });

  if (!response.ok) {
    throw new Error(ErrorMessage.failDeleteItem);
  }

  return response.ok;
}
