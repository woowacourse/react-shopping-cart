import { httpClient } from '../../../shared/api/httpClient';

export const deleteCartItem = (cartItemId: number) => {
  return httpClient.delete(`/cart-items/${cartItemId}`);
};
