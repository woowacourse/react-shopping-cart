import { atom } from 'recoil';

import { ProductItemType } from '../types';

const productListState = atom<ProductItemType[]>({
  key: 'productList',
  default: [],
  effects: [
    ({ setSelf }) => {
      setSelf([]);
    },
  ],
});

export default productListState;
