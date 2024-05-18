import { atom, atomFamily } from 'recoil';

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});

export const uncheckedItemIdsState = atom<number[]>({
  key: 'isCheckedItemIdsState',
  default: [],
});
