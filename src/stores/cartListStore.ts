import { atom, selector, selectorFamily } from 'recoil';
import { CartList } from '../types/CartList.ts';
import { getCartListFromLocalStorage } from '../utils/localStorageCartList.ts';

export const cartListAtom = atom<CartList>({
  key: 'cartListAtom',
  default: getCartListFromLocalStorage(),
});

export const carListTotalQuantitySelector = selector({
  key: 'carListTotalQuantitySelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    return Object.keys(cartList).reduce((acc, curr) => {
      return acc + cartList[parseInt(curr, 10)].quantity;
    }, 0);
  },
});

export const cartItemsQuantitySelector = selector({
  key: 'cartItemsQuantitySelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    return Object.keys(cartList).length;
  },
});

export const productQuantitySelector = selectorFamily({
  key: 'productQuantitySelector',
  get:
    (itemId: number) =>
    ({ get }) => {
      const cartList = get(cartListAtom);

      return cartList[itemId]?.quantity ?? 0;
    },
});
