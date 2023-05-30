import { atom } from 'recoil';

import { ProductItemType } from '../types';

const productListState = atom<ProductItemType[]>({
  key: 'productList',
  default: [],
});

export default productListState;
