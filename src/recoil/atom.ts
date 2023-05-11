import { atom, selector } from 'recoil';
import type { Product } from '../types';

export const $Products = atom<Product[]>({
  key: 'products',
  default: [],
});

export const $CartCount = atom<Record<number, number>>({
  key: 'CartCount',
  default: {},
});

export const $CartCountTotal = selector({
  key: 'CartCountTotal',
  get: ({ get }) => {
    const total = Object.values(get($CartCount)).reduce((acc, count) => acc + count, 0);
    return total;
  },
});
