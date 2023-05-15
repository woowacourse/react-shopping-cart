import { atom } from 'recoil';

import initialListData from '../data/mockData.json';
import { ProductItemType } from '../types';

const productListState = atom<ProductItemType[]>({
  key: 'productList',
  default: [],
  effects: [({ setSelf }) => setSelf(initialListData)],
});

export default productListState;
