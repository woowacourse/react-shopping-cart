import type { CartItemType } from '../types';
import { atom, selector, selectorFamily } from 'recoil';
import { LOCAL_STORAGE_KEY } from '../constants';
import { API_URL } from '../constants/api';
import { getCart } from '../api/cart';
import { getProducts } from '../api/product';

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartState = atom<CartItemType[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.CART)],
});

export const filteredCartState = selectorFamily({
  key: 'filteredCartState',
  get:
    (productId) =>
    ({ get }) => {
      const filteredCart = get(cartState).filter((item) => item.product.id !== productId);
      return filteredCart;
    },
});

export const cartCountState = selector<number>({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});

export const selectedCartState = atom<number[]>({
  key: 'selectedCartState',
  default: [],
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.SELECTED_CART)],
});

export const productState = atom({
  key: 'productState',
  default: [],
});

export const getProductState = selector({
  key: 'product/get',
  get: async ({ get }) => {
    try {
      return await getProducts();
    } catch (err) {
      throw err;
    }
  },
  set: ({ set }, newValue) => {
    set(productState, newValue);
  },
});
