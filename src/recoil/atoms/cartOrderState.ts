import { atom } from 'recoil';
import type { CartItem } from '../../type';
import localStorageEffect from '../effects/localStorageEffect';

const cartOrderState = atom<Array<CartItem['id']>>({
  key: 'cartOrderState',
  default: [],
  effects: [localStorageEffect('cartOrderState')],
});

export default cartOrderState;
