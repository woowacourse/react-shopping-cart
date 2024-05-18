import { atom, atomFamily } from 'recoil';

export const itemQuantityState = atomFamily<number, number>({
  key: 'itemQuantityState',
  default: 1,
});

export const isCheckedItemIdsState = atom<Record<number, boolean>>({
  key: 'isCheckedItemIdsState',
  default: {},
});
