import { atom, atomFamily, selector } from 'recoil';
import { CartItem } from '../type';
import { fetchCartItems } from '../apis';

export const cartItemsState = selector({
  key: 'cartItemsState',
  get: async () => {
    const cartItems = await fetchCartItems();
    return cartItems;
  },
});

export const currentCartItemsState = atom<CartItem[]>({
  key: 'currentCartItemsState',
  default: cartItemsState,
});

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});

export const isCheckedItemIdsState = atom<Record<number, boolean>>({
  key: 'isCheckedItemIdsState',
  default: {},
});
