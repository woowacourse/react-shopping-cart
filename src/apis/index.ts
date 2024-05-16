import type { TCartItem } from '../types/CartItem.type';
import { generateBasicToken } from '../utils/auth';
import { CART_ITEM_ERROR_MESSAGE } from '../constants/MESSAGES';

const API_URL = import.meta.env.VITE_API_URL;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;

const fetchCartItemList = async (): Promise<TCartItem[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(CART_ITEM_ERROR_MESSAGE.FETCH);
  }

  const data = await response.json();

  return data.content;
};

const addCartItem = async (cartItemId: number): Promise<void> => {
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
    throw new Error(CART_ITEM_ERROR_MESSAGE.ADD);
  }
};
const removeCartItem = async (cartItemId: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error(CART_ITEM_ERROR_MESSAGE.REMOVE);
  }
};

const updateCartItemQuantity = async (cartItemId: number, quantity: number): Promise<void> => {
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
    throw new Error(CART_ITEM_ERROR_MESSAGE.UPDATE);
  }
};

export { fetchCartItemList, addCartItem, removeCartItem, updateCartItemQuantity };
