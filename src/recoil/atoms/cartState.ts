import { atom } from 'recoil';
import { client } from '../../api';
import type { Cart } from '../../type';

const cartState = atom<Cart>({
  key: 'cartState',
  default: client.get('/cart-items').then((res) => res.data),
});

export default cartState;
