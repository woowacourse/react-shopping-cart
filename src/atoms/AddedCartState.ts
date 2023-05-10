import { atom } from 'recoil';
import { AddedProductList } from '../types/productType';

const addedProductList: AddedProductList[] = [];

export const addedCartState = atom({
  key: 'addedCartState',
  default: addedProductList,
});
