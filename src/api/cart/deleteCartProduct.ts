import { apiClient } from "../apiClient";

export const deleteCartProduct = (cartId: number) =>
  apiClient.delete({ endPoint: `/cart-items/${cartId}` });
