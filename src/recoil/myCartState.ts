import { atom } from 'recoil';

import { MyProduct } from '../types/Product';

const myCartState = atom<MyProduct[]>({
  key: 'myCartState',
  default: [],
});

export default myCartState;
