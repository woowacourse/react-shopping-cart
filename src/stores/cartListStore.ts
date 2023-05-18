import { atom, selector, selectorFamily } from 'recoil';
import { CartList } from '../types/CartList.ts';
import { getCartListFromLocalStorage } from '../utils/localStorageCartList.ts';

export const cartListAtom = atom<CartList | null>({
  key: 'cartListAtom',
  default: getCartListFromLocalStorage(),
});

export const carListTotalQuantitySelector = selector({
  key: 'carListTotalQuantitySelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    if (!cartList) {
      return 0;
    }

    return Object.keys(cartList.items).reduce((acc, curr) => {
      return acc + cartList.items[parseInt(curr, 10)].quantity;
    }, 0);
  },
});

export const productQuantitySelector = selectorFamily({
  key: 'productQuantitySelector',
  get:
    (itemId: number) =>
    ({ get }) => {
      const cartList = get(cartListAtom);

      if (!cartList) {
        return 0;
      }

      return cartList.items[itemId]?.quantity ?? 0;
    },
});
