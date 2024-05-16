import { generateBasicToken } from './utils/auth';
import { CartItemData } from '@/types';
import Fetcher from './Fetcher';

const API_URL = process.env.API_URL;
const USER_ID = process.env.USER_ID;
const USER_PASSWORD = process.env.USER_PASSWORD;

interface CartItemsResponse {
  content: CartItemData[];
}

export async function fetchCartItems(): Promise<CartItemData[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const data = await Fetcher.sendRequest<CartItemsResponse>(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  return data.content;
}

export async function updateCartItemQuantity(id: number, newQuantity: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  await Fetcher.sendRequest(`${API_URL}/cart-items/${id}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quantity: newQuantity,
    }),
  });

  return { success: true };
}

export async function deleteCartItem(id: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  await Fetcher.sendRequest(`${API_URL}/cart-items/${id}`, {
    method: 'DELETE',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  return { success: true };
}
