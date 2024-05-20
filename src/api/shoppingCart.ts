import { BASE_URL, USER_ID, USER_PASSWORD } from '.';
import MESSAGE from '../constants/Message';
import { CartItemType } from '../type';
import { generateBasicToken } from './auth';

export const fetchCartItems = async (): Promise<CartItemType[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${BASE_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(MESSAGE.fetchError);
  }

  const data = await response.json();
  return data.content;
};

export const fetchRemoveCartItem = async (
  cartItemId: number,
): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${BASE_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(MESSAGE.removalError);
  }
};

export const fetchAdjustCartItemQuantity = async (
  cartItemId: number,
  quantity: number,
): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${BASE_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(MESSAGE.quantityAdjustmentError);
  }
};
