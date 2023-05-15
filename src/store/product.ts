import { atom } from 'recoil';

import { getProductList } from '../api/productAPI';
import { ProductItemData } from '../types';

const productListState = atom<ProductItemData[]>({
  key: 'productList',
  default: [],
  effects: [
    ({ setSelf }) => {
      setSelf(getProductList().then((savedValue) => savedValue ?? []));
    },
  ],
});

export { productListState };
