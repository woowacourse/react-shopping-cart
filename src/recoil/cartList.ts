import { useLocalStorage } from 'hooks/useLocalStorage';
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { CartId, Cart, ProductId } from 'types';

const { getLocalStorageData } = useLocalStorage();

export const cartIds = atom<CartId[]>({
  key: 'cartIds',
  default: getLocalStorageData<Cart[]>('cartList').map(
    (cartItem) => cartItem.id
  ),
});

export const cartItemAtom = atomFamily<Cart | null, CartId>({
  key: 'cartItem',
  default: (productId) => {
    const cartListStorage = getLocalStorageData<Cart[]>('cartList');
    const item = cartListStorage.find((cartItem) => cartItem.id === productId);
    if (!item) return null;
    return item;
  },
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    return get(cartIds).length;
  },
});

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (productId: ProductId) =>
    ({ get }) => {
      if (!get(cartIds).includes(productId)) return null;

      return get(cartItemAtom(productId));
    },

  set:
    (productId: ProductId) =>
    ({ set, reset }, item) => {
      if (!item || item instanceof DefaultValue) return;

      if (item.quantity === 0) {
        reset(cartItemAtom(productId));
      }
      set(cartItemAtom(productId), item);
    },
});
