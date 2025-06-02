import { CartItemProps } from '../types/cartItem';
import { apiRequest } from './apiRequest';
import { PatchCartItemProps } from '../types/cartApi';

const cart = {
  getCartList: async () => {
    const response = await apiRequest<{ content: CartItemProps[] }>({
      url: '/cart-items',
      method: 'GET',
    });

    return response.content;
  },

  patchCartItem: async ({ cartItemId, quantity }: PatchCartItemProps) => {
    await apiRequest({
      url: `/cart-items/${cartItemId}`,
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  },

  deleteCartItem: async (cartItemId: number) => {
    await apiRequest({
      url: `/cart-items/${cartItemId}`,
      method: 'DELETE',
    });
  },
};

export default cart;
