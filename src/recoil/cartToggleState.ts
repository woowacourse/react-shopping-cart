import { DefaultValue, atom, selector, selectorFamily } from 'recoil';

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

export const toggledProductsSelector = selector<number[]>({
  key: 'toggledProductSelector',

  get: ({ get }) => {
    const toggleState = get(cartToggleState);
    return Object.keys(toggleState)
      .filter((id) => toggleState[Number(id)])
      .map(Number);
  },
});

export const allCheckedStatusSelector = selector({
  key: 'allCheckedStatusSelector',

  get: ({ get }) =>
    get(toggledProductsSelector).length === Object.keys(get(cartToggleState)).length,

  set: ({ get, set }, isAllChecked) => {
    const prevState = get(cartToggleState);
    const newState: Record<number, boolean> = {};

    Object.keys(prevState)
      .map(Number)
      .forEach((id) => {
        if (isAllChecked instanceof DefaultValue) {
          newState[id] = true;
        } else {
          newState[id] = isAllChecked;
        }
      });

    set(cartToggleState, newState);
  },
});

export default cartToggleState;
