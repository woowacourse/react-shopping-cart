import { atom } from 'recoil';
import * as T from '../types/ProductType';

const cartListState = atom<T.CartProduct[]>({
  key: 'cartListState',
  default: [],
});

export default cartListState;
