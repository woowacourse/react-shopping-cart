import { atom, selector } from 'recoil';
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

export const cartTotalPriceSelector = selector({
  key: 'cartTotalPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    if (!cartList) {
      return 0;
    }

    return Object.keys(cartList.items).reduce((acc, curr) => {
      const item = cartList.items[parseInt(curr, 10)];

      if (item.isSelected === false) {
        return acc;
      }

      return acc + item.quantity * item.itemInfo.price;
    }, 0);
  },
});

export const cartSelectedItemsSelector = selector({
  key: 'cartSelectedItemsSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    if (!cartList) {
      return [];
    }

    return [cartList.items.filter((item) => item.isSelected).length, cartList.items.length];
  },
});
