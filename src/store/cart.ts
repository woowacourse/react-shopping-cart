import { atom, selector, selectorFamily } from 'recoil';
import { Cart } from '../types/product';
import { fetchedCartListSelector } from './fetchSelectors';

export const cartAtom = atom<Cart[]>({
  key: 'cartAtom',
  default: fetchedCartListSelector,
});

export const cartSelector = selector({
  key: 'cartSelector',
  get: ({ get }) => {
    const cartList = get(cartAtom);

    const cartsQuantity = cartList.length;

    const totalAmount = cartList.reduce(
      (a, b) => a + b.product.price * b.quantity,
      0
    );

    return { cartsQuantity, totalAmount };
  },
});

export const cartSelectorFamily = selectorFamily({
  key: 'select-family',
  get:
    (id: number) =>
    ({ get }) => {
      const carts = get(cartAtom);

      return carts.find((item) => item.id === id) as Cart;
    },
});
