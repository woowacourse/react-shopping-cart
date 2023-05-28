import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

import { CheckedStateType } from '../types';
import { LOCAL_STORAGE_KEY, RECOIL_KEY } from '../constants';

export const CheckedState = atom<CheckedStateType>({
  key: RECOIL_KEY.CHECKED_STATE,
  default: {
    all: true,
  },
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.CHECKED_STATE)],
});

export const CheckedLength = selector({
  key: 'checkedLength',
  get: ({ get }) => {
    const checkedState = get(CheckedState);
    return Object.keys(checkedState).length - 1;
  },
});

export const useCheckedState = () => useRecoilState(CheckedState);

export const useCheckedLength = () => useRecoilValue(CheckedLength);

export const useSetCheckedState = () => useSetRecoilState(CheckedState);
