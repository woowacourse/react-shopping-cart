import { atom } from 'recoil';
import type { CartProduct } from '../../type';

const checkedCartState = atom<CartProduct['id'][]>({
  key: 'checkedCart',
  default: [],
});

export default checkedCartState;
