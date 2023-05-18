import { atom } from 'recoil';

import { ShoppingCartProduct } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

const shoppingCartState = atom<ShoppingCartProduct[]>({
  key: 'shoppingCartState',
  default: localStorageHelper.hasKey('cartItems') ? localStorageHelper.getValue('cartItems') : [],
});

export default shoppingCartState;
