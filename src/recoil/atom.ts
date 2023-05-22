import { atom } from 'recoil';
import { LOCAL_STORAGE_KEY } from '../constants';
import { getLocalStorage } from '../utils/localStorage';
import type { CartItem, ToastState } from '../types';

export const $CheckedCartIdList = atom<number[]>({
  key: 'CheckStateList',
  default: getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []).map(item => item.id),
});

export const $CartIdList = atom<number[]>({
  key: 'CartIdList',
  default: getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_ITEM, []).map(item => item.id),
});

export const $ToastStateList = atom<ToastState[]>({
  key: 'ToastMessageList',
  default: [],
});
