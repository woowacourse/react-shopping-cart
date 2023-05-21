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

export const checkedCartCountSelector = selector({
  key: 'checkedCartCountSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    const checkedCount = cartList.filter((cartItem) => cartItem.checked).length;
    return checkedCount;
  }
});

export const cartCheckedSelector = selector({
  key: 'cartCheckedSelector',
  get: ({get}) => {
    const cartList = get(cartState);
    const cartCount = get(cartCountSelector);
    if (cartCount > 0) {
      const isAllCartItemChecked = cartList.every((cartItem) => cartItem.checked === true);
      return isAllCartItemChecked;
    } else {
      return false;
    }
  }
});
