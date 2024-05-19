import { atom } from 'recoil';

export const uncheckedItemIdsState = atom<number[]>({
  key: 'isCheckedItemIdsState',
  default: [],
});
