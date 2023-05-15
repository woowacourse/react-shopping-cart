import { selectorFamily } from 'recoil';
import type { Cart } from '../../type';
import cartState from '../atoms/cartState';

export const cartItemFamily = selectorFamily<Cart[number] | null, number>({
  key: 'cartItemFamily',
  get:
    (productId: number) =>
    ({ get }) => {
      const cart = get(cartState);
      const cartItem = cart.find((item) => item.productId === productId);
      return cartItem ?? null;
    },
});
