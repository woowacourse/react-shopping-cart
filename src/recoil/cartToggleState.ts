import { DefaultValue, atom, selectorFamily } from 'recoil';

const KEY = 'LOCAL_CART_TOGGLES';

const cartToggleState = atom<Record<number, boolean>>({
  key: 'cartToggleState',
  default: JSON.parse(localStorage.getItem(KEY) ?? '{}'),

  effects: [
    ({ onSet }) => onSet((newState) => localStorage.setItem(KEY, JSON.stringify(newState))),
  ],
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
