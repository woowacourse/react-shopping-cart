import { CartItem, CartItemCounts } from '../types';
import { generateBasicToken } from '../utils/auth';

const API_URL = import.meta.env.VITE_BASE_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

// POST : /cart-items 사용자의 장바구니에 아이템 추가
export async function postAddCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
}

// GET : /cart-items 사용자의 장바구니 목록 조회
export async function getCartItems(
  page: number = 0,
  size: number = 20,
): Promise<CartItem[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(
    `${API_URL}/cart-items?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: { Authorization: token },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const data = await response.json();
  return data.content;
}

// GET : /cart-items/counts 장바구니 아이템 수량 조회
export async function getCartItemCounts(): Promise<CartItemCounts> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/counts`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart item counts');
  }

  const data = await response.json();
  return data;
}

// PATCH : /cart-items/{id} 장바구니 아이템 수량 변경
export async function patchCartItemQuantityChange(
  cartItemId: number,
  quantity: number,
): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart item quantity');
  }
}

// DELETE : /cart-items/{id} 장바구니 아이템 삭제
export async function deleteCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }
}
