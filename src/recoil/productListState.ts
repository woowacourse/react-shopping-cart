import { atom } from 'recoil';
import * as T from '../types/ProductType';

const productListState = atom<T.ProductItem[]>({
  key: 'productListState',
  default: [],
});

export default productListState;
