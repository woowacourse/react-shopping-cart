import { atom } from 'recoil';
import type { Cart } from '../../type';
import localStorageEffect from '../effects/localStorageEffect';

const cartState = atom<Cart>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect('cartState')],
});

export default cartState;
