import { selector, atom, selectorFamily } from 'recoil';
import { CartItem } from '../types/cart';
import { fetchCart } from '../apis/cart';

export const cartState = atom({
  key: 'cart',
  default: selector({
    key: 'getMockCart',
    get: async () => {
      const { cart } = await fetchCart();

      return cart;
    },
  }),
});

export const hasItemInCart = selectorFamily({
  key: 'hasItemInCart',
  get:
    (id: CartItem['id']) =>
    ({ get }) => {
      return get(cartState).find((item) => item.id === id);
    },
});
