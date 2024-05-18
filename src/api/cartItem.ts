import { API_URL, ENDPOINT, USER_ID, USER_PASSWORD } from "@/api/config";

import { CartItemType } from "@/types/cart.type";
import { ERROR_MESSAGE } from "@/constants/error";
import { generateBasicToken } from "@/utils/auth";

export async function getCartList(): Promise<CartItemType[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}${ENDPOINT.cartItem.getList}`, {
    method: "GET",
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.getCartList);
  }

  const data = await response.json();
  return data.content;
}

export async function postCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}${ENDPOINT.cartItem.postItem}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.postCartItem);
  }
}

export async function deleteCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(
    `${API_URL}${ENDPOINT.cartItem.deleteItem(cartItemId)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.deleteCartItem);
  }
}

export async function patchCartItem(
  cartItemId: number,
  quantity: number
): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(
    `${API_URL}${ENDPOINT.cartItem.patchItem(cartItemId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ quantity }),
    }
  );
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.patchCartItem);
  }
}

export async function getCartItemCount(): Promise<number> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}${ENDPOINT.cartItem.getItemCount}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE.getCartItemCount);
  }

  const data = await response.json();
  return data.quantity;
}
