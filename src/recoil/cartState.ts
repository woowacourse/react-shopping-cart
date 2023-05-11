import { atom, atomFamily, selector } from 'recoil';
import { Cart } from '../types/product';

export const cartAtom = atom<number[]>({
  key: 'cart',
  default: [],
});

export const cartAtomState = atomFamily<Cart, number>({
  key: 'cart',
  default: (id) =>
    JSON.parse(localStorage.getItem('cart') || '[]').find(
      (cart: Cart) => cart.id === id
    ),
});

export const cartQuantitySelector = selector({
  key: 'cartQuantitySelector',
  get: ({ get }) => {
    const carts = get(cartAtom);
    return carts.reduce((a, b) => a + get(cartAtomState(b)).quantity, 0);
  },
});
