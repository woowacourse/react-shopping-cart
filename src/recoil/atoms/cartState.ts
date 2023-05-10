import { atom } from 'recoil';
import type { Cart } from '../../type';

const cartState = atom<Cart>({
  key: 'cartState',
  default: [],
});

export default cartState;
