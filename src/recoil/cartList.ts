import { useLocalStorage } from 'hooks/useLocalStorage';
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { CartId, Cart } from 'types';

const { getLocalStorageData } = useLocalStorage();

export const cartIds = atom<CartId[]>({
  key: 'cartIds',
  default: getLocalStorageData<Cart[]>('cartList').map(
    (cartItem) => cartItem.id
  ),
});

export const cartItemAtom = atomFamily<Cart | null, CartId>({
  key: 'cartItem',
  default: (cartId) => {
    const cartListStorage = getLocalStorageData<Cart[]>('cartList');
    const item = cartListStorage.find((cartItem) => cartItem.id === cartId);
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

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const ids = get(checkedItemsIdAtom);
    const totalPrice = ids
      .map((id) => get(cartItemAtom(id)))
      .reduce((acc, item) => {
        if (!item) return acc;
        const { price } = item.product;
        const { quantity } = item;
        return acc + price * quantity;
      }, 0);
    return totalPrice;
  },
});

export const updateCart = selectorFamily({
  key: 'updateCart',
  get:
    (cartId: CartId) =>
    ({ get }) => {
      if (!get(cartIds).includes(cartId)) return null;

      return get(cartItemAtom(cartId));
    },

  set:
    (cartId: CartId) =>
    ({ set, reset }, item) => {
      if (!item || item instanceof DefaultValue) return;

      if (item.quantity === 0) {
        reset(cartItemAtom(cartId));
      }
      set(cartItemAtom(cartId), item);
    },
});
