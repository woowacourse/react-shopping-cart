import { atom } from 'recoil';
import { CartProductList } from '../types/productType';

const cartStateInit: CartProductList[] = [];

export const cartState = atom({
  key: 'CartState',
  default: cartStateInit,
});
