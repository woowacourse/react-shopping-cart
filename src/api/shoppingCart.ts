import { BASE_URL } from '.';

import { CartItemType } from '../type';
import MESSAGE from '../constants/Message';
import { fetchWithPayload, fetchWithoutPayload } from './fetch';

export const fetchGetCartItems = async (): Promise<CartItemType[]> => {
  const response = await fetchWithoutPayload({
    url: `${BASE_URL}/cart-items`,
    method: 'GET',
    errorMessage: MESSAGE.error.gettingCartItems,
  });

  const data = await response.json();
  return data.content;
};

export const fetchRemoveCartItem = async (
  cartItemId: number,
): Promise<void> => {
  await fetchWithoutPayload({
    url: `${BASE_URL}/cart-items/${cartItemId}`,
    method: 'DELETE',
    errorMessage: MESSAGE.error.cartItemRemoval,
  });
};

export const fetchAdjustCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
): Promise<void> => {
  await fetchWithPayload({
    url: `${BASE_URL}/cart-items/${cartItemId}`,
    method: 'PATCH',
    payload: { quantity },
    errorMessage: MESSAGE.error.cartItemQuantityAdjustment,
  });
};
