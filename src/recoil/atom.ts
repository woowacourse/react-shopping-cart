import { atom } from 'recoil';

export const $Cart = atom<number[]>({
  key: 'Cart',
  default: [],
});

export const $ToastMessageList = atom<string[]>({
  key: 'ToastMessageList',
  default: [],
});
