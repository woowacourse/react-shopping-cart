import { atom, atomFamily, selector } from 'recoil';
import { getCartCounts } from '../api';
import { fetchCartData } from './selectors';

export const cartData = atom<Cart[]>({
  key: 'cartData',
  default: fetchCartData,
});

export const cartQuantity = atom<number>({
  key: 'cartQuantity',
  default: getCartCounts(),
});

export const cartItemQuantityState = atom<Record<number, number>>({
  key: 'cartItemQuantityState',
  default: selector({
    key: 'itemQuantityObject',
    get: ({ get }) => {
      const obj: Record<number, number> = {};
      get(cartData).forEach((cartItem: Cart) => {
        obj[cartItem.id] = cartItem.quantity;
      });
      return obj;
    },
  }),
});

export const cartItemCheckState = atomFamily<boolean, number>({
  key: 'cartItemCheckState',
  default: false,
});
