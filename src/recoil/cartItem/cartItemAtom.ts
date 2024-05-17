import { atomFamily } from 'recoil';

export const cartItemQuantityAtomFamily = atomFamily<number, number>({
  key: 'cartItemQuantity',
  default: 0,
  // effects: (param) => [localStorageEffect(`${param}`)],
});
