import { atom, selector } from 'recoil';
import { Cart } from '../types/product';

export const cartAtom = atom<Cart[]>({
  key: 'cart',
  default: JSON.parse(localStorage.getItem('cart') || '[]'),
});

export const cartQuantitySelector = selector({
  key: 'cartQuantitySelector',
  get: ({ get }) => {
    const carts = get(cartAtom);
    const quantity = carts.reduce((result, cart) => result + cart.quantity, 0);
    return quantity < 100 ? quantity : '99';
  },
});
