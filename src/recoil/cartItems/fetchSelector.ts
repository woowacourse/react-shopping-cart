import { selector } from 'recoil';

import { CartItemProps } from '@/types/cartItem';
import { fetchCartItems } from '@apis/cartItem';

export const fetchCartItemsSelector = selector<CartItemProps[]>({
  key: 'fetchCartItemsSelector',
  get: async () => {
    const cartItems = await fetchCartItems();

    return cartItems;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
