import { atom } from 'recoil';
import * as T from '../types/ProductType';

const cartListState = atom<T.CartItem[]>({
  key: 'cartListState',
  default: [],
});

export default cartListState;
