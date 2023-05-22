import { atom } from 'recoil';
import { CartItem, Product } from 'src/types';
import { cartListSelector, productListSelector } from '../selector';
import { ToastProps } from 'src/components/@common/Toast';

export const cartListAtom = atom<CartItem[]>({
  key: 'cartItemAtom',
  default: cartListSelector,
});

export const toastAtom = atom<ToastProps[]>({
  key: 'toastAtom',
  default: [],
});

export const productItems = atom<Product[]>({
  key: 'productAtom',
  default: productListSelector,
});
