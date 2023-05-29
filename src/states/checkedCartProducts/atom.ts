import { atom, selector } from 'recoil';

import { cartProductState } from '../cartProducts';

export const checkedState = atom<number[]>({
  key: 'checkedState',
  default: selector({
    key: 'checkedState/default',
    get: ({ get }) =>
      get(cartProductState).map((cartProduct) => cartProduct.id),
  }),
});
