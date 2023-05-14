import { atom } from 'recoil';
import { CartProductList } from '../types/productType';

const cartProductList: CartProductList[] = [];

export const cartState = atom({
  key: 'cartState',
  default: cartProductList,
});
