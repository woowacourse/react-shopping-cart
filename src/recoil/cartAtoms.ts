import {atom, selector} from 'recoil';
import {CartItem} from '../types/types';

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
});

export const cartCountSelector = selector({
  key: 'cartCountSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    return cartList.length;
  }
});
