import { atom } from 'recoil';

export const cartSelects = atom<Set<number>>({
  key: 'cartSelects',
  default: new Set<number>(),
});
