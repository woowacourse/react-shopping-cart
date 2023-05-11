import { atom } from 'recoil';

import { CartItemData } from '../types';

export const cartAdditionState = atom<boolean>({
  key: 'cartAddition',
  default: false,
  effects: [
    ({ setSelf, onSet }) => {
      onSet(() => {
        setTimeout(() => {
          setSelf(false);
        }, 2500);
      });
    },
  ],
});

export const cartListState = atom<CartItemData[]>({
  key: 'cartList',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = 'cartList';
      const savedValue = localStorage.getItem(storeKey);

      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(storeKey)
          : localStorage.setItem(storeKey, JSON.stringify(newValue));
      });
    },
  ],
});
