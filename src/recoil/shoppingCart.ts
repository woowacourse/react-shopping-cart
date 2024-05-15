import { fetchCartItems } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { PRICE, STORAGE_KEY } from '@constants/index';
import { atom, AtomEffect, selector } from 'recoil';

export const cartItemsAtom = atom<CartItem[]>({
  key: 'cartItemsAtom',
  default: [],
});

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(key);

      return localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const selectedIdsAtom = atom<number[]>({
  key: 'selectedIdsAtom',
  default: JSON.parse(localStorage.getItem(STORAGE_KEY.selectedItems) ?? '[]') ?? [],
  effects: [localStorageEffect(STORAGE_KEY.selectedItems)],
});

export const cartItemsSelector = selector<CartItem[]>({
  key: 'cartItemsSelector',
  get: async ({ get }) => {
    const prevCartItems = get(cartItemsAtom);

    if (prevCartItems.length > 0) return prevCartItems;

    const cartItems = await fetchCartItems();

    return cartItems;
  },

  set: ({ set }, newValue) => {
    set(cartItemsAtom, newValue);
  },
});

export const orderPriceSelector = selector({
  key: 'orderPriceState',
  get: ({ get }) => {
    const { freeShippingMinAmount, shippingFee } = PRICE;
    const cartItems = get(cartItemsSelector);
    const selectedIds = get(selectedIdsAtom);
    const selectedCartItems = cartItems.filter((item) => selectedIds.includes(item.id));

    const orderPrice = selectedCartItems.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
    const shippingPrice =
      orderPrice === 0 || orderPrice >= freeShippingMinAmount ? shippingFee.free : shippingFee.basic;
    const totalPrice = orderPrice + shippingPrice;

    return { orderPrice, shippingPrice, totalPrice };
  },
});
