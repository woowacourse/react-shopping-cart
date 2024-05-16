import { generateBasicToken } from './utils/auth';
import { CartItemType } from '../types';

const API_URL = process.env.API_URL;
const USER_ID = process.env.USER_ID;
const USER_PASSWORD = process.env.USER_PASSWORD;

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

/**
 * updateCartItemQuantity - API에 카트 상품의 quantity를 업데이트 요청하는 함수입니다.
 * @param {number} id - quantity를 업데이트할 상품의 Id
 * @param {number} newQuantity  - 업데이트할 상품의 quantity
 * @returns {boolean} - fetch의 성공 여부입니다.
 */
export async function updateCartItemQuantity(id: number, newQuantity: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${id}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quantity: newQuantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  return { success: true };
}

/**
 * deleteCartItem - API에 카트에서 해당 id의 상품을 삭제 요청하는 함수입니다.
 * @param {number} id - 카트에서 삭제할 상품의 id
 * @returns {boolean} - fetch의 성공 여부입니다.
 */
export async function deleteCartItem(id: number) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${id}`, {
    method: 'DELETE',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  return { success: true };
}
