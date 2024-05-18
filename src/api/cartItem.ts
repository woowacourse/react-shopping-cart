import { CartItemType } from "@/types/cart.type";
import { ENDPOINT } from "@/api/config";
import { ERROR_MESSAGE } from "@/constants/error";
import fetchWithBasicToken from "./fetchWithBasicToken";

export async function getCartList(): Promise<CartItemType[]> {
  const response = await fetchWithBasicToken({
    method: "GET",
    endPoint: ENDPOINT.cartItem.getList,
    errorMessage: ERROR_MESSAGE.getCartList,
  });

  const data = await response.json();
  return data.content;
}

export async function postCartItem(productId: number): Promise<void> {
  await fetchWithBasicToken({
    method: "POST",
    endPoint: ENDPOINT.cartItem.postItem,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
    errorMessage: ERROR_MESSAGE.patchCartItem,
  });
}

export async function deleteCartItem(cartItemId: number): Promise<void> {
  await fetchWithBasicToken({
    method: "DELETE",
    endPoint: ENDPOINT.cartItem.deleteItem(cartItemId),
    errorMessage: ERROR_MESSAGE.deleteCartItem,
  });
}

export async function patchCartItem(
  cartItemId: number,
  quantity: number
): Promise<void> {
  await fetchWithBasicToken({
    method: "PATCH",
    endPoint: ENDPOINT.cartItem.patchItem(cartItemId) + "}}",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
    errorMessage: ERROR_MESSAGE.patchCartItem,
  });
}

export async function getCartItemCount(): Promise<number> {
  const response = await fetchWithBasicToken({
    method: "GET",
    endPoint: ENDPOINT.cartItem.getItemCount,
    errorMessage: ERROR_MESSAGE.getCartItemCount,
  });

  const data = await response.json();
  return data.quantity;
}
