import { atom } from 'recoil';

import { ShoppingCartProduct } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

const selectedShoppingItemState = atom<number[]>({
  key: 'selectedShoppingItemState',
  default: localStorageHelper.hasKey('cartItems')
    ? (localStorageHelper.getValue('cartItems') as ShoppingCartProduct[]).map((item) => item.id)
    : [],
});

export default selectedShoppingItemState;
