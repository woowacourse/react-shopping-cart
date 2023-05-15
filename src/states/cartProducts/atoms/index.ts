import { atom } from 'recoil';

import { localStorageEffect } from '../../atomEffects';
import { CART_STORAGE_ID } from '../../../constants/storage';
import { CartProduct } from '../../../types/product';

export const cartProductState = atom<CartProduct[]>({
  key: 'cartProductState',
  default: [],
  effects: [localStorageEffect(CART_STORAGE_ID)],
});
