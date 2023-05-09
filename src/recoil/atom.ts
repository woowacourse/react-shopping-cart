import { atom } from 'recoil';

export const $CartCount = atom<Record<number, number>>({
  key: 'CartCount',
  default: {},
});
