import {apiClient} from '../apiClient';

export const patchCartProduct = (cartId: number, quantity: number) =>
  apiClient.patch({
    endPoint: `/cart-items/${cartId}`,
    body: JSON.stringify({
      quantity: quantity,
    }),
  });
