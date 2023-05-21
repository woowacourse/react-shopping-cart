import { atom, selector, selectorFamily } from 'recoil';
import { Cart } from '../types/product';
import { fetchedCartListSelector } from './asyncSelector';

export const cartAtom = atom<Cart[]>({
  key: 'cart/cart-list',
  default: fetchedCartListSelector,
});

export const cartSelector = selector({
  key: 'cart/selector',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const cartsQuantity = cartList.length;

    return { cartsQuantity };
  },
});

export const cartSelectorFamily = selectorFamily({
  key: 'cart/selector-family',
  get:
    (id: number) =>
    ({ get }) => {
      const cartList = get(cartAtom);

      return cartList.find((item) => item.id === id) as Cart;
    },
});

export const checkedValue = selector({
  key: 'cart/checked-value',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const NO_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: false,
    }));

    const ALL_CHECKED = cartList.map((item) => ({
      id: item.id,
      isSelected: true,
    }));

    return { NO_CHECKED, ALL_CHECKED };
  },
});

export const totalAmountAtom = atom({
  key: 'cart/total-amount',
  default: 0,
});
