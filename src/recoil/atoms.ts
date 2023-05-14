import { atom } from 'recoil';
import * as T from '../types/ProductType';

const cartState = atom<T.CartProduct[]>({
  key: 'cartState',
  default: [],
});

export default cartState;
