import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { CartItem, ProductId } from 'src/types';

export const productIds = atom<Array<ProductId>>({
  key: 'productIds',
  default: [],
});

export const cartItemAtom = atomFamily<CartItem | null, ProductId>({
  key: 'cartItem',
  default: null,
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    const ids = get(productIds);
    return ids.length;
  },
});

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (productId: ProductId) =>
    ({ get }) => {
      return get(cartItemAtom(productId) ?? null );
    },

  set:
    (productId: ProductId) =>
    ({ set,reset }, item) => {
      if (!item || item instanceof DefaultValue) return;
      
      if (item.quantity === 0) {
        reset(cartItemAtom(productId));
        return;
      }

      set(cartItemAtom(productId), item);
    },
});
