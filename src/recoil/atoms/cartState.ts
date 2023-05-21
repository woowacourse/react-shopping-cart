import { atom } from 'recoil';
import type { Cart } from '../../type';
import mswServerEffect from '../effects/mswServerEffect';

const cartState = atom<Cart>({
  key: 'cartState',
  default: [],
  effects: [mswServerEffect('cartState')],
});

export default cartState;
