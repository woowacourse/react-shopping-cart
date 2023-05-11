import { ShoppingCartProduct } from '@Types/index';
import { atom } from 'recoil';

const shoppingCartState = atom({
  key: 'shoppingCartState',
  default: [] as ShoppingCartProduct[],
});

export default shoppingCartState;
