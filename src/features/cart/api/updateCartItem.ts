import { httpClient } from '../../../shared/api/httpClient';

export const updateCartItem = (cartItemId: number, quantity: number) => {
  return httpClient.patch(`/cart-items/${cartItemId}`, {
    quantity: quantity,
  });
};
