import { CartItem } from "../types";
import apiClient from "./apiClient";

export async function fetchCartItems(): Promise<CartItem[]> {
  return await apiClient.get("/cart-items", {}).then((data) => data.content);
}

export async function addCartItem(productId: number): Promise<void> {
  await apiClient.post("/cart-items", {}, { productId });
}

export async function deleteCartItem(addToCartId: number): Promise<void> {
  await apiClient.delete(`/cart-items/${addToCartId}`, {});
}

export async function patchCartItemQuantity(addToCartId: number, quantity: number) {
  await apiClient.patch(`/cart-items/${addToCartId}`, {}, { quantity });
}

export async function fetchCartItemsCounts(): Promise<number> {
  return await apiClient.get("/cart-items/counts", {}).then((data) => data.quantity);
}
