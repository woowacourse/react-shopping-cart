import { Product } from "../types";
import apiClient from "./apiClient";

export function fetchCartItems(): Promise<Product[]> {
  return apiClient.get("/cart-items", {}).then((data) => data.content);
}

export function addCartItem(productId: number): void {
  apiClient.post("/cart-items", {}, { productId });
}

export function deleteCartItem(addToCartId: number): void {
  apiClient.delete(`/cart-items/${addToCartId}`, {});
}

export function patchCartItemQuantity(addToCartId: number, quantity: number) {
  apiClient.patch(`/cart-items/${addToCartId}`, {}, { quantity });
}

export function fetchCartItemsCounts(): Promise<number> {
  return apiClient.get("/cart-items/counts", {}).then((data) => data.quantity);
}
