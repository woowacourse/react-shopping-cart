import { atom } from 'recoil';
import { fetchCartItem, getCartCounts } from '../api';

export const cartData = atom<Cart[]>({
  key: 'cartData',
  default: fetchCartItem(),
});

export const cartQuantity = atom<number>({
  key: 'cartQuantity',
  default: getCartCounts(),
});
