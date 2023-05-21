import { atom, selector } from 'recoil';

import { cartProductState } from '../cartProducts';
import type { CheckedState } from './type';

export const checkedState = atom<CheckedState[]>({
  key: 'checkedState',
  default: selector({
    key: 'checkedState/default',
    get: ({ get }) =>
      get(cartProductState).map((cartProduct) => ({
        id: cartProduct.id,
        isChecked: false,
      })),
  }),
});
