import { atom } from 'recoil';
import { Product } from '../types';

export const productListState = atom<Product[]>({
  key: 'productListState',
  default: [],
});
