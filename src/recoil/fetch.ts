import { selector } from 'recoil';
import { refreshCartItemsState } from './cartItems';
import { fetchCartItems } from '../api/shoppingCart';

export const fetchedCartItemsSelector = selector({
  key: 'cartItemStateSelector',
  get: async ({ get }) => {
    get(refreshCartItemsState);
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});
