import { atom, atomFamily } from 'recoil';
import { localStorageEffect } from '../../utils/localStorageEffect';

export const cartItemQuantityAtomFamily = atomFamily<number, number>({
  key: 'cartItemQuantity',
  default: 0,
  effects: (param) => [localStorageEffect(`${param}`)],
});

export const cartItemSelectedIdListAtom = atom<number[]>({
  key: 'cartItemSelectedIdList',
  default: [],
  effects: [localStorageEffect('cartItemSelectedIdList')],
});
