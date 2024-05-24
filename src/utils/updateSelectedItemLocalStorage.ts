import { AtomEffect, DefaultValue } from 'recoil';
import { CartItemProps } from '../types';

export const updateSelectedItemLocalStorage =
  (key: string): AtomEffect<CartItemProps[]> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet(
      (
        newSelectedValue: CartItemProps[] | DefaultValue,
        oldValue: CartItemProps[] | DefaultValue,
        isReset?: boolean,
      ) => {
        if (isReset) {
          localStorage.removeItem(key);
        } else if (newSelectedValue instanceof DefaultValue) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newSelectedValue));
        }
      },
    );
  };
