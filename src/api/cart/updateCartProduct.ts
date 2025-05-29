import { apiClient } from "../apiClient";

export const updateCartProduct = (cartId: number, quantity: number) =>
  apiClient.update({
    endPoint: `/cart-items/${cartId}`,
    body: JSON.stringify({
      quantity: quantity,
    }),
  });
