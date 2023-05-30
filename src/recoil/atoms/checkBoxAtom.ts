import { atom } from 'recoil';

export const checkBoxAtom = atom<number[]>({
  key: 'checkBoxAtom',
  default: [],
});
