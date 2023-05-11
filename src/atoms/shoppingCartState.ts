import { atom } from 'recoil';

import { ShoppingCartProduct } from '@Types/index';

const shoppingCartState = atom({
  key: 'shoppingCartState',
  default: [] as ShoppingCartProduct[],
});

export default shoppingCartState;
