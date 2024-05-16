import { CartItem } from '@appTypes/shoppingCart';
import { STORAGE_KEY } from '@constants/storage';
import { localStorageEffect } from '@recoil/common/localStorageEffect';
import { atom } from 'recoil';

export const cartItemsAtom = atom<CartItem[]>({
  key: 'cartItemsAtom',
  default: [],
});

export const selectedIdsAtom = atom<number[]>({
  key: 'selectedIdsAtom',
  default: JSON.parse(localStorage.getItem(STORAGE_KEY.selectedItems) ?? '[]') ?? [],
  effects: [localStorageEffect(STORAGE_KEY.selectedItems)],
});
