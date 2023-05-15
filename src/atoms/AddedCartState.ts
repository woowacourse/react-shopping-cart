import { atom } from 'recoil';
import { AddedProductList } from '../types/productType';

const cartState: AddedProductList[] = [];

export const CartState = atom({
  key: 'cartState',
  default: cartState,
});
