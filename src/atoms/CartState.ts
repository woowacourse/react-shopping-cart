import { atom, selector } from 'recoil';
import { CartProductList } from '../types/productType';

const cartProductList: CartProductList[] = [];

export const cartState = atom({
  key: 'cartState',
  default: cartProductList,
});

export const cartCountState = selector({
  key: 'cartCountState',
  get: ({ get }) => get(cartState).length,
});
