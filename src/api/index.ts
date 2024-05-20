import { CartItemType } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

function generateBasicToken(userId: string, userPassword: string) {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}

const HEADERS = {
  Authorization: generateBasicToken(USERNAME, PASSWORD),
  'Content-Type': 'application/json',
};

const CART_ITEMS_API_URL = `${BASE_URL}/cart-items`;

export const fetchCartItems = async (): Promise<CartItemType[]> => {
  const response = await fetch(`${CART_ITEMS_API_URL}`, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }

  const data = await response.json();
  return data.content;
};

export const updateCartItemQuantity = async (
  id: CartItemType['id'],
  quantity: CartItemType['quantity']
) => {
  const response = await fetch(`${CART_ITEMS_API_URL}/${id}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
};

export const deleteCartItem = async (id: CartItemType['id']) => {
  const response = await fetch(`${CART_ITEMS_API_URL}${id}`, {
    method: 'DELETE',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
};

export const addCartItem = async (id: CartItemType['id']) => {
  const response = await fetch(`${CART_ITEMS_API_URL}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ productId: id }),
  });

  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
};
