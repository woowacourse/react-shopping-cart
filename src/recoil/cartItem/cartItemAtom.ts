import { atom, atomFamily } from 'recoil';
import { localStorageEffect } from '../../utils/localStorageEffect';

export const cartItemQuantityAtomFamily = atomFamily<number, number>({
  key: 'cartItemQuantity',
  default: 0,
});

export const cartItemSelectedIdListAtom = atom<number[]>({
  key: 'cartItemSelectedIdList',
  default: [],
  effects: [localStorageEffect<number[]>('cartItemSelectedIdList')],
});
