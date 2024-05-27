import { cartItemsAtom } from '@recoil/shoppingCart/cartItems';
import { atomFamily, selectorFamily } from 'recoil';

export const quantitySelectorFamily = selectorFamily<number, number>({
  key: 'quantitySelectorFamily',
  get:
    (id) =>
    ({ get }) => {
      const cartItems = get(cartItemsAtom);
      return cartItems.find((item) => item.id === id)?.quantity ?? 1;
    },
});

export const quantityAtomFamily = atomFamily<number, number>({
  key: 'quantityAtomFamily',
  default: quantitySelectorFamily,
});
