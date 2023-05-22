import { API_URL } from '../constants/api';
import { CartItemType } from '../types';

export const cart = {
  getCart: async () => {
    const response = await fetch(API_URL.CART, {
      headers: {
        Accept: 'application / json',
      },
      method: 'GET',
    });
    const data = await response.json();

    return data;
  },

  createCartItem: async (productId: number): Promise<CartItemType> => {
    const response = await fetch(API_URL.CART, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        productId,
      }),
    });

    const data = await response.json();
    return data;
  },

  updateCartItemQuantity: async (cartItemId: number, quantity: number) => {
    const response = await fetch(`${API_URL.CART}/${cartItemId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        quantity,
      }),
    });

    return response;
  },

  deleteCartItem: async (cartItemId: number) => {
    const response = await fetch(`${API_URL.CART}/${cartItemId}`, {
      method: 'DELETE',
    });

    return response;
  },
};
