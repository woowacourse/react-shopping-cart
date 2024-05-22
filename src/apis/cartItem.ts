import { CartItemProps } from '@/types/cartItem';
import { generateBasicToken } from '@/utils/auth';

const CART_ITEM_URL = import.meta.env.VITE_BASE_URL + '/cart-items';
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

const cartItemURLWithCartId = (cartId: number) => CART_ITEM_URL + '/' + cartId;

export const fetchCartItems = async (): Promise<CartItemProps[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(CART_ITEM_URL, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const data = await response.json();

  return data.content;
};

export const updateItemQuantity = async (cartId: number, quantity: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(cartItemURLWithCartId(cartId), {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to patch cart items');
  }
};

export const deleteItem = async (cartId: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(cartItemURLWithCartId(cartId), {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to delete cart items');
  }
};
