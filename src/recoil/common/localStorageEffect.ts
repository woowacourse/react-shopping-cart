import { isTypeOfSet } from '@utils/dataType';
import { AtomEffect } from 'recoil';

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ onSet }) => {
    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage.removeItem(key);

      if (isTypeOfSet(newValue)) return localStorage.setItem(key, JSON.stringify([...newValue]));

      return localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
