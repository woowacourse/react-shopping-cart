import type { CartItems } from '../pages/ShoppingCartPage/ShoppingCartPage.type';
import { generateBasicToken } from '../utils/auth';

async function fetchCartItems(): Promise<CartItems[]> {
  const token = generateBasicToken(import.meta.env.VITE_USER_ID, import.meta.env.VITE_USER_PASSWORD);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  const data = await response.json();

  return data.content;
}

async function addCartItems(cartItemId: number): Promise<number> {
  const token = generateBasicToken(import.meta.env.VITE_USER_ID, import.meta.env.VITE_USER_PASSWORD);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ id: cartItemId }),
  }); // TODO: 중복 id POST 처리 메서드 추가

  return response.status;
}
async function removeCartItems(cartItemId: number): Promise<number> {
  const token = generateBasicToken(import.meta.env.VITE_USER_ID, import.meta.env.VITE_USER_PASSWORD);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  return response.status;
}

async function updateCartItems(cartItemId: number, quantity: number): Promise<number> {
  const token = generateBasicToken(import.meta.env.VITE_USER_ID, import.meta.env.VITE_USER_PASSWORD);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  return response.status;
}

export { fetchCartItems, addCartItems, removeCartItems, updateCartItems };
