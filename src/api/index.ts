import { Coupon } from '../types/Coupon';
import { Items } from '../types/Item';
import { FetchResponseType } from '../types/api';
import { generateBasicToken } from '../utils/Auth';

const API_URL = import.meta.env.VITE_API_URL;

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

const token = generateBasicToken(USER_ID, USER_PASSWORD);
const fetchResponse = async ({
  url,
  method,
  body = null,
}: FetchResponseType) => {
  const response = await fetch(`${API_URL}${url}`, {
    method: method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
    body,
  });

  return response;
};

export async function fetchItems(): Promise<Items[]> {
  const response = await fetchResponse({
    url: '/cart-items',
    method: 'GET',
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
  const response = await fetchResponse({
    url: `/cart-items/${cartItemId}`,
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart item quantity');
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const response = await fetchResponse({
    url: `/cart-items/${cartItemId}`,
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove cart item');
  }
}

export async function fetchCoupons(): Promise<Coupon[]> {
  const response = await fetchResponse({
    url: '/coupons',
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Coupons');
  }

  const data = await response.json();
  return data;
}
