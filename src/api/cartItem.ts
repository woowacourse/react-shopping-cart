import apiClient from "./apiClient";
import { Product } from "../types/product";

export function fetchCartItems(): Promise<Product[]> {
  return apiClient.get({ endpoint: "/cart-items" }).then((data) => data.content);
}

export function addCartItem(productId: number): void {
  apiClient.post({ endpoint: "/cart-items", body: { productId } });
}

export function deleteCartItem(addToCartId: number): void {
  apiClient.delete({ endpoint: `/cart-items/${addToCartId}` });
}

export function patchCartItemQuantity(addToCartId: number, quantity: number): void {
  apiClient.patch({ endpoint: `/cart-items/${addToCartId}`, body: { quantity } });
}

export function fetchCartItemsCounts(): Promise<number> {
  return apiClient.get({ endpoint: "/cart-items/counts" }).then((data) => data.quantity);
}
