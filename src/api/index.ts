import { generateBasicToken } from '../utils/auth';

const API_URL = 'http://54.180.95.212:8080';
const USER_ID = `${import.meta.env.VITE_USER_ID}`;
const USER_PASSWORD = `${import.meta.env.VITE_USER_PASSWORD}`;

export async function fetchCartItem(): Promise<Cart[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('장바구니를 불러오는데 실패했습니다.');
  }

  const data = await response.json();
  return data.content;
}

export async function addCartItem(productId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }
}

export async function patchCartItem(
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
    body: JSON.stringify({
      quantity: quantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to patch cart item');
  }
}

export async function getCartCounts(): Promise<number> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/counts`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('장바구니 상품 종류 수량을 불러오는데 실패했습니다.');
  }

  const data = await response.json();
  return data.quantity;
}
