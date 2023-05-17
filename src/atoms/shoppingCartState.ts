import { atom } from 'recoil';

import { ShoppingCartProduct } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

const shoppingCartState = atom({
  key: 'shoppingCartState',
  default: localStorageHelper.getValue('cartItems') as ShoppingCartProduct[],
});

export default shoppingCartState;
