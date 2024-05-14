import { atom, atomFamily } from 'recoil';
import { Products } from '../types/Product';

export const itemsState = atom<Products[]>({
  key: 'itemsState',
  default: [],
});

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});
