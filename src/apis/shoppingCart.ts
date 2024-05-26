import { CartItem } from '@appTypes/shoppingCart';
import { generateBasicToken } from '@utils/auth';

import { USER_ID, USER_PASSWORD } from './constants';
import endPoint from './endPoint';

export async function fetchCartItems(): Promise<CartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(endPoint.cartItems, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.content;
}
/**
 * @param {number} productId : 상품 id
 * @param {number} quantity : 변경될 수량
 */
export async function fetchCartItemCount(productId: number, quantity: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(endPoint.cartItem(productId), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
}

export async function fetchDeleteCartItem(productId: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(endPoint.cartItem(productId), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete cart item');
  }
}
