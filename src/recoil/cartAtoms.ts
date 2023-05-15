import { atom } from 'recoil';
import { Cart } from '../types/types';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: sessionStorage,
});

export const cartState = atom<Cart[]>({
  key: 'cartState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
