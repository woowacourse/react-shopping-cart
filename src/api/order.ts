import apiClient from "./apiClient";

export function orderCartItems(cartItemIds: number[]): void {
  apiClient.post({ endpoint: "/orders", body: { cartItemIds } });
}
