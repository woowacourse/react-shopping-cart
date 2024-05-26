import { AtomEffect, DefaultValue } from 'recoil';

export const localStorageEffectForAtom =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: T, _: T | DefaultValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };
