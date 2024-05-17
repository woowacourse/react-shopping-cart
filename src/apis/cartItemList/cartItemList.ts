import { generateBasicToken } from '../../utils/auth';
import type { CartItem, ResponseCartItem } from '../cartItem/cartItem.type';
import { ResponseCartItemList } from './cartItemList.type';

const API_URL = process.env.VITE_API_URL || 'url';
const USER_ID = process.env.VITE_API_USER_ID || 'id';
const USER_PASSWORD = process.env.VITE_API_USER_PASSWORD || 'password';

const PreprocessCartItemList = (arr: ResponseCartItem[]): CartItem[] => {
  return arr.map(({ id, quantity, product }) => ({
    quantity,
    product: {
      id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    },
    cartItemId: id,
  }));
};

export const requestCartItemList = async (): Promise<CartItem[]> => {
  try {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);
    const response = await fetch(`${API_URL}/cart-items`, {
      method: 'GET',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
    const data: ResponseCartItemList = await response.json();
    return PreprocessCartItemList(data.content);
  } catch (error) {
    throw new Error('Failed to requestCartItemList');
  }
};

export const requestSetCartItemQuantity = async (cartItemId: number, quantity: number) => {
  try {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);
    await fetch(`${API_URL}/cart-items/${cartItemId}`, {
      method: 'PATCH',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity,
      }),
    });
  } catch (error) {
    throw new Error('Failed to requestSetCartItemQuantity');
  }
};

export const requestDeleteCartItem = async (cartItemId: number) => {
  try {
    const token = generateBasicToken(USER_ID, USER_PASSWORD);
    await fetch(`${API_URL}/cart-items/${cartItemId}`, {
      method: 'DELETE',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: cartItemId,
      }),
    });
  } catch (error) {
    throw new Error('Failed to requestDeleteCartItem');
  }
};
