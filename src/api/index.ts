import { CartItems } from '../types/Item';
import { Coupon } from '../types/coupon';
import { generateBasicToken } from '../utils/Auth';

const API_URL = import.meta.env.VITE_API_URL;

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

export async function fetchItems(): Promise<CartItems[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }
  const data = await response.json();
  return data.content;
}

export async function fetchCartItemQuantity(
  cartItemId: number,
  quantity: number,
): Promise<void> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity: quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart item quantity');
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
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

export async function fetchCoupons(): Promise<Coupon[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/coupons`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Coupons');
  }

  const data = await response.json();
  return data;
}

export async function fetchOrder(cartItemIds: number[]) {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      cartItemIds: cartItemIds,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }
}
