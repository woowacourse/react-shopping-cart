import { atom, useRecoilState, useSetRecoilState } from 'recoil';
import { localStorageEffect } from './localStorageEffect';

import { CheckedStateType } from '../types';
import { LOCAL_STORAGE_KEY, RECOIL_KEY } from '../constants';

export const CheckedState = atom<CheckedStateType>({
  key: RECOIL_KEY.CHECKED_STATE,
  default: {
    all: false,
  },
  effects: [localStorageEffect(LOCAL_STORAGE_KEY.CHECKED_STATE)],
});

export const useCheckedState = () => useRecoilState(CheckedState);

export const useSetCheckedState = () => useSetRecoilState(CheckedState);
