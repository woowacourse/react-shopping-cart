import { atom } from 'recoil';

export const selectedCartItemTotalPriceState = atom<number>({
  key: 'selectedCartItemTotalPriceState',
  default: 0,
});
