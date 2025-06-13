import { CartItemProps } from '../types/cartItem';
import { apiRequest } from './apiRequest';

const cart = {
  getCartList: async () => {
    const response = await apiRequest({
      url: '/cart-items',
      method: 'GET',
    });

    return response.content;
  },

  increaseCartItem: async (cartItem: CartItemProps) => {
    await apiRequest({
      url: `/cart-items/${cartItem.id}`,
      method: 'PATCH',
      body: {
        id: cartItem.id,
        quantity: cartItem.quantity + 1,
      },
    });
  },

  decreaseCartItem: async (cartItem: CartItemProps) => {
    await apiRequest({
      url: `/cart-items/${cartItem.id}`,
      method: 'PATCH',
      body: {
        id: cartItem.id,
        quantity: cartItem.quantity - 1,
      },
    });
  },

  deleteCartItem: async (cartItemId: number) => {
    await apiRequest({
      url: `/cart-items/${cartItemId}`,
      method: 'DELETE',
    });
  },

  getCouponList: async () => {
    const response = await apiRequest({
      url: `/coupons`,
      method: 'GET',
    });

    return response.content;
  },
};

export default cart;
