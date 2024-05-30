import { CartItem } from "@/types/cart";
import { basicToken } from "@/auth";
import { ErrorMessage } from "@/constants/error";
import { API_URL } from "@/apis/url";

export async function getCartItems(): Promise<CartItem[]> {
  const response = await fetch(`${API_URL.cartItems}`, {
    method: "GET",
    headers: { Authorization: basicToken },
  });

  if (!response.ok) {
    throw new Error(ErrorMessage.failGetCartList);
  }

  const data = await response.json();

  return data.content;
}

export async function postCartItem({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  const response = await fetch(`${API_URL.cartItems}`, {
    method: "POST",
    headers: { Authorization: basicToken, "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error(ErrorMessage.failPostCartItem);
  }
  const data = await response.json();

  return data;
}

export async function patchCartItemQuantity(
  cartItemId: number,
  quantity: number
): Promise<boolean> {
  const response = await fetch(API_URL.cartItemsWithId(cartItemId), {
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
  const response = await fetch(API_URL.cartItemsWithId(cartItemId), {
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
