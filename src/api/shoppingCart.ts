import { fetchWithPayload, fetchWithoutPayload } from './fetch';

import { BASE_URL } from '.';
import { CartItemType } from '../type';
import MESSAGE from '../constants/Message';

export const fetchGettingCartItems = async (): Promise<CartItemType[]> => {
  const response = await fetchWithoutPayload({
    url: `${BASE_URL}/cart-items`,
    method: 'GET',
    errorMessage: MESSAGE.error.gettingCartItems,
  });

  const data = await response.json();
  return data.content;
};

export const fetchRemovingCartItem = async (
  cartItemId: number,
): Promise<void> => {
  try {
    await fetchWithoutPayload({
      url: `${BASE_URL}/cart-items/${cartItemId}`,
      method: 'DELETE',
      errorMessage: MESSAGE.error.cartItemRemoval,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchAdjustingCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
): Promise<void> => {
  try {
    await fetchWithPayload({
      url: `${BASE_URL}/cart-items/${cartItemId}`,
      method: 'PATCH',
      payload: { quantity },
      errorMessage: MESSAGE.error.cartItemQuantityAdjustment,
    });
  } catch (error) {
    console.error(error);
  }
};
