import { DefaultValue, atom, selector, selectorFamily } from 'recoil';
import serverCartState from './serverCartState';
import type { LocalCartToggle } from '../types/Cart';

const KEY = 'LOCAL_CART_TOGGLES';

const synchronizedCartSelector = selector({
  key: 'synchronizedCartSelector',

  get: ({ get }) => {
    const serverCart = get(serverCartState);
    const localCart: LocalCartToggle = JSON.parse(localStorage.getItem(KEY) ?? '{}');

    const cart: LocalCartToggle = {};

    serverCart.forEach(({ id }) => {
      if (!localCart[id]) cart[id] = true;
      else cart[id] = localCart[id];
    });

    return cart;
  },
});

const cartToggleState = atom<Record<number, boolean>>({
  key: 'cartToggleState',
  default: synchronizedCartSelector,

  effects: [
    ({ onSet }) => onSet((newState) => localStorage.setItem(KEY, JSON.stringify(newState))),
  ],
});

export const localCartLengthSelector = selector({
  key: 'localCartLengthSelector',

  get: ({ get }) => Object.keys(get(cartToggleState)).length,
});

export const productToggleSelector = selectorFamily<boolean, number>({
  key: 'productToggleSelector',

  get:
    (productId) =>
    ({ get }) =>
      get(cartToggleState)[productId] ?? 0,

  set:
    (productId) =>
    ({ get, set }, isToggled) => {
      const newToggleState = { ...get(cartToggleState) };

      if (isToggled instanceof DefaultValue) {
        delete newToggleState[productId];
      } else if (newToggleState[productId] === isToggled) {
        return;
      } else {
        newToggleState[productId] = isToggled;
      }

      set(cartToggleState, newToggleState);
    },
});

export default cartToggleState;
