import { atom, atomFamily } from 'recoil';
import { localStorageEffectForAtom } from '../../utils/localStorageEffectForAtom';

export const cartItemQuantityAtomFamily = atomFamily<number, number>({
  key: 'cartItemQuantity',
  default: 0,
});

export const cartItemSelectedIdListAtom = atom<number[]>({
  key: 'cartItemSelectedIdList',
  default: [],
  effects: [localStorageEffectForAtom<number[]>('cartItemSelectedIdList')],
});
