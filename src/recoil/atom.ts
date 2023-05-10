import { atom, selector } from 'recoil';

export const $CartCount = atom<Record<number, number>>({
  key: 'CartCount',
  default: {},
});

export const products = atom({
  key: 'products',
  default: [],
});

export const getProductSelector = selector({
  key: 'products/get',
  get: async ({ get }) => {
    try {
      const data = await fetch('/products').then(res => res.json());
      return data;
    } catch (e) {
      throw new Error();
    }
  },
});
