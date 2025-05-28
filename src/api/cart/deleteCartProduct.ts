import { apiClient } from "../../../shared/utils/requestApi";

export const deleteCartProduct = (cartId: number) =>
  apiClient.delete({ endPoint: `/cart-items/${cartId}` });
