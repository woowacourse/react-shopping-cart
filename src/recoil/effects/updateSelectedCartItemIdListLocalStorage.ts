import { AtomEffect, DefaultValue } from 'recoil';

export const updateSelectedCartItemIdListLocalStorage =
  (key: string): AtomEffect<number[]> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((selectedCartItemIdList: number[], _: number[] | DefaultValue, isReset: boolean) => {
      if (isReset) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(selectedCartItemIdList));
    });
  };
