import { atom, selector, selectorFamily } from 'recoil';
import { fetchCartItems } from '@api/index';
import { CartItemType } from '../types';

export const fetchCartItemState = atom({
  key: 'fetchCartItemState',
  default: selector({
    key: 'fetchCartItemState/Default',
    get: async () => {
      try {
        const products = await fetchCartItems();
        return products;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
      return [];
    },
  }),
});

export const isCheckedState = atom<Record<number, boolean>>({
  key: 'isCheckedState',
  default: {},
  effects: [
    ({ onSet }) => {
      onSet((newState: Record<number, boolean>) => {
        window.localStorage.setItem('isChecked', JSON.stringify(newState));
      });
    },
  ],
});

export const productsIdState = selector({
  key: 'productsIdState',
  get: ({ get }) => {
    const keys = get(fetchCartItemState).map((product: CartItemType) => {
      return product.id;
    });

    return keys;
  },
});

export const productQuantityState = selectorFamily<number, number>({
  key: 'productQuantityState',
  get:
    (id: number) =>
    ({ get }) => {
      const products = get(fetchCartItemState);
      const product = products.find((item) => item.id === id);
      return product ? product.quantity : 0;
    },
});
