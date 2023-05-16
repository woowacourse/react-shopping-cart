import type { AtomEffect } from 'recoil';
import { atom } from 'recoil';
import { CartItem } from '../types';

const localStorageEffect: <T>(key: string) => AtomEffect<T> = (key: string) => ({
  setSelf,
  onSet,
}) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue !== null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    if (isReset) return localStorage.removeItem(key);
    return localStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [localStorageEffect<CartItem[]>('cart')],
});
