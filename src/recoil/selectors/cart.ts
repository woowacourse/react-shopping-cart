import { selector } from 'recoil';
import type { CartItem } from '../../types/product';
import { fetchCartItems } from '../../remotes/cart';
import { CART_BASE_URL } from '../../remotes/constants';

export const cartItemsQuery = selector<CartItem[]>({
  key: 'cartItems',
  get: async () => {
    const cartItems = await fetchCartItems(CART_BASE_URL);

    return cartItems;
  },
});
