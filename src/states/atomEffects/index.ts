import type { AtomEffect } from 'recoil';

export const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ trigger, setSelf, onSet }) => {
    if (trigger === 'get') {
      setSelf(JSON.parse(localStorage.getItem(key) ?? '[]'));
    }

    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
