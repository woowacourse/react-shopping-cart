import { atom } from 'recoil';

import initialListData from '../data/mockData.json';
import { ProductItemData } from '../types';

const productListState = atom<ProductItemData[]>({
  key: 'productList',
  default: [],
  effects: [({ setSelf }) => setSelf(initialListData)],
});

export { productListState };
