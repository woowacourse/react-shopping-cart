import { atom } from 'recoil';

import { ShoppingCartProduct } from '@Types/index';

const shoppingCartState = atom<ShoppingCartProduct[] | null>({
  key: 'shoppingCartState',
  default: null,
});

export default shoppingCartState;
