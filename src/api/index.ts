import { generateBasicToken } from './utils/auth';
import { CartItemType } from '../types';

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

/**
 * fetchCartItems - API에서 카트의 상품들을 fetch하는 비동기 함수입니다.
 * @returns
 */
export async function fetchCartItems(): Promise<CartItemType[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const data = await response.json();

  return data.content;
}
