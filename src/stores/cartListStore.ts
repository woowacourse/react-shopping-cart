import { atom, selector, selectorFamily } from 'recoil';

type CartList = { [key: number]: { quantity: number } };

export const cartListAtom = atom<CartList>({
  key: 'cartListAtom',
  default: {},
});
