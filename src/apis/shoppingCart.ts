import { CartItem } from '@appTypes/shoppingCart';
import HTTPError from '@errors/HTTPError';
import { generateBasicToken } from '@utils/auth';

const API_URL = process.env.VITE_API_URL as string;
const USER_ID = process.env.VITE_USER_ID as string;
const USER_PASSWORD = process.env.VITE_USER_PASSWORD as string;

export async function fetchCartItems(): Promise<CartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new HTTPError(response.status, 'Failed to fetch products');
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

  const response = await fetch(`${API_URL}/cart-items/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new HTTPError(response.status, 'Failed to add cart item');
  }
}

export async function fetchDeleteCartItem(productId: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new HTTPError(response.status, 'Failed to delete cart item');
  }
}
