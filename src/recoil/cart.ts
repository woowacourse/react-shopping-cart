import { selector, atom, selectorFamily } from 'recoil';
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

export const cartBadge = selector({
  key: 'cartBadge',
  get: ({ get }) => {
    const numberOfItem = get(cartState).length;
    return numberOfItem > 99 ? '99+' : numberOfItem;
  },
});
