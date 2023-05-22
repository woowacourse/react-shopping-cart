import { atom, selector, selectorFamily } from 'recoil';
import type { CartItem } from '../types/index.ts';

export const cartListAtom = atom<CartItem[]>({
  key: 'cartListAtom',
  default: [],
});

export const cartItemQuantitySelector = selectorFamily({
  key: 'cartItemQuantitySelector',
  get:
    (productId: number) =>
    ({ get }) => {
      const cartList = get(cartListAtom);
      const targetItem = cartList.find((item) => item.product.id === productId);

      return targetItem ? targetItem.quantity : 0;
    },
});

export const cartItemIdSelector = selectorFamily({
  key: 'cartItemIdSelector',
  get:
    (productId: number) =>
    ({ get }) => {
      const cartList = get(cartListAtom);

      const targetItem = cartList.find((item) => item.product.id === productId);

      return targetItem ? targetItem.id : null;
    },
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);

    return cartList.length;
  },
});

export const itemSelectionAtom = atom<boolean[]>({
  key: 'itemSelectionAtom',
  default: [],
});

export const cartTotalPriceSelector = selector({
  key: 'cartTotalPriceSelector',
  get: ({ get }) => {
    const cartList = get(cartListAtom);
    const itemSelection = get(itemSelectionAtom);

    const checkedCart = cartList.filter((_, index) => itemSelection[index]);

    return checkedCart.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  },
});
