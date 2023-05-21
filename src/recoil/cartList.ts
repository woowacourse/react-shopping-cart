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

export const cartListAtom = atom<Cart[]>({
  key: 'cartList',
  default: getLocalStorageData<Cart[]>('cartList'),
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

export const checkedItemsAtom = atom<Cart[]>({
  key: 'checkedItemsAtom',
  default: [],
});

export const countCartListSelector = selector({
  key: 'countCartListSelector',
  get: ({ get }) => {
    return get(cartListAtom).length;
  },
});

export const totalPriceSelector = selector({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const checkedItems = get(checkedItemsAtom);
    const totalPrice = checkedItems.reduce((acc, item) => {
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
      const cartItem = get(cartListAtom).find(({ id }) => id === cartId);
      return cartItem ?? null;
    },

  set:
    (cartId: CartId) =>
    ({ get, set }, item) => {
      if (!item || item instanceof DefaultValue) return;
      const cartList = get(cartListAtom);
      const cartItem = cartList.find(({ id }) => id === cartId);
      if (!cartItem) {
        set(cartListAtom, [...cartList, item]);
        return;
      }
      if (item.quantity === 0) {
        set(
          cartListAtom,
          cartList.filter(({ id }) => id !== cartId)
        );
        return;
      }
      set(
        cartListAtom,
        cartList.map((prev) => (prev.id === cartId ? item : prev))
      );
    },
});
