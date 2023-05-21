import { atom, selector } from 'recoil';

import { cartProductState } from '../../cartProducts';

interface CheckedState {
  id: number;
  isChecked: boolean;
}

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
