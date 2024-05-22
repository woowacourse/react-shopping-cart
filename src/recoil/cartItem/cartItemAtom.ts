import { atom } from 'recoil';
import { localStorageEffectForAtom } from '../../utils/localStorageEffectForAtom';

export const cartItemSelectedIdListAtom = atom<number[]>({
  key: 'cartItemSelectedIdList',
  default: [],
  effects: [localStorageEffectForAtom<number[]>('cartItemSelectedIdList')],
});
