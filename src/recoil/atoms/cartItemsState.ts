import { atom } from 'recoil';

import { CartItemType } from '@Types/index';

const cartItemsState = atom<CartItemType[] | null>({
  key: 'cartItemsState',
  default: null,
});

export default cartItemsState;
