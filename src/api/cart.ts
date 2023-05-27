import { API_URL } from '../constants/api';
import { CartItemType } from '../types';

export const cart = {
  getCart: async () => {
    try {
      const response = await fetch(API_URL.CART, {
        headers: {
          Accept: 'application / json',
        },
        method: 'GET',
      });
      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  },

  createCartItem: async (productId: number) => {
    try {
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
    } catch (err) {
      console.log(err);
      alert(err);
    }
  },

  updateCartItemQuantity: async (cartItemId: number, quantity: number) => {
    try {
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
    } catch (err) {
      console.log(err);
      alert(err);
    }
  },

  deleteCartItem: async (cartItemId: number) => {
    try {
      const response = await fetch(`${API_URL.CART}/${cartItemId}`, {
        method: 'DELETE',
      });

      return response;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  },
};
