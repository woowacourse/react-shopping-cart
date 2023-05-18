import { atom } from 'recoil';

import { ShoppingCartProduct } from '@Types/index';

const shoppingCartState = atom<ShoppingCartProduct[]>({
  key: 'shoppingCartState',
  default: [],
});

export default shoppingCartState;
