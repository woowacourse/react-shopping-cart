import { ShoppingBasketProduct } from '@Types/index';
import { atom } from 'recoil';

const shoppingBasketState = atom({
  key: 'shoppingBasketState',
  default: [] as ShoppingBasketProduct[],
});

export default shoppingBasketState;
