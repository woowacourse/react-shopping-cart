import { apiClient } from "../../../shared/utils/requestApi";

export const updateCartProduct = (cartId: number, quantity: number) =>
  apiClient.update({
    endPoint: `/cart-items/${cartId}`,
    body: JSON.stringify({
      quantity: quantity,
    }),
  });
