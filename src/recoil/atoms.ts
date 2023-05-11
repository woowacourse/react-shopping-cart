import { atom } from 'recoil';
import * as T from '../types/ProductType';

interface Cart {
  id: number;
  quantity: number;
  product: T.ProductItem;
}

const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
});

export default cartState;
