import { atom } from 'recoil';
import { Cart, ProductItem } from '../types/types';
import mockData from '../assets/mockData.json';

export const productListState = atom<ProductItem[]>({
  key: 'productListState',
  default: mockData as ProductItem[],
});

export const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
});

