import type { TCartItem } from '../types/CartItem.type';
import { generateBasicToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_API_URL;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;

async function fetchCartItems(): Promise<TCartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  const data = await response.json();

  return data.content;
}

async function addCartItems(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ id: cartItemId }),
  });

  if (!response.ok) {
    alert('상품을 장바구니에 추가하는 중 오류가 발생했습니다.');
    throw new Error('상품을 장바구니에 추가하는 중 오류가 발생했습니다.');
  }
}
async function removeCartItems(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    alert('상품을 장바구니에서 제거하는 중 에러가 발생했습니다.');
    throw new Error('상품을 장바구니에서 제거하는 중 에러가 발생했습니다.');
  }
}

async function updateCartItemQuantity(cartItemId: number, quantity: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  if (!response.ok) {
    alert('상품 개수를 업데이트하는 중 문제가 발생했습니다.');
    throw new Error('상품 개수를 업데이트하는 중 문제가 발생했습니다.');
  }
}

export { fetchCartItems, addCartItems, removeCartItems, updateCartItemQuantity };
