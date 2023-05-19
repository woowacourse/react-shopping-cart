import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { localStorageEffect } from '../hooks/localStorageEffect';

interface Checked {
  [key: number]: boolean;
  all: boolean;
}

const CheckedState = atom<Checked>({
  key: 'checked',
  default: {
    all: false,
  },
  effects: [localStorageEffect('checkedProductInCart')],
});

export const useCheckedState = () => useRecoilState(CheckedState);

export const useSetCheckedState = () => useSetRecoilState(CheckedState);
