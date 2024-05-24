import API_CONFIG from './config';
import { CartItem } from '../type';
import { generateBasicToken } from '../utils/auth';

const API_URL = API_CONFIG.API_URL;
const USER_ID = API_CONFIG.USER_ID;
const USER_PASSWORD = API_CONFIG.USER_PASSWORD;

const CART_ITEMS = 'cart-items';
const ORDERS = 'orders';

const AUTH_HEADER = {
  'Content-Type': 'application/json',
  Authorization: generateBasicToken(USER_ID, USER_PASSWORD),
};

export async function fetchCartItems(): Promise<CartItem[]> {
  const response = await fetch(`${API_URL}/${CART_ITEMS}`, {
    method: 'GET',
    headers: AUTH_HEADER,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const data = await response.json();
  return data.content;
}

export async function addCartItem(productId: number): Promise<void> {
  const response = await fetch(`${API_URL}/${CART_ITEMS}`, {
    method: 'POST',
    headers: AUTH_HEADER,
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const response = await fetch(`${API_URL}/${CART_ITEMS}/${cartItemId}`, {
    method: 'DELETE',
    headers: AUTH_HEADER,
  });

  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number): Promise<void> {
  const response = await fetch(`${API_URL}/${CART_ITEMS}/${cartItemId}`, {
    method: 'PATCH',
    headers: AUTH_HEADER,
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
}

export async function orderItems(itemIds: number[]): Promise<void> {
  const response = await fetch(`${API_URL}/${ORDERS}`, {
    method: 'POST',
    headers: AUTH_HEADER,
    body: JSON.stringify({ cartItemIds: itemIds }),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
}
