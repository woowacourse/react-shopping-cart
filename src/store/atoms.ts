import { atomFamily } from 'recoil';

export const productQuantityState = atomFamily<number, number>({
  key: 'productQuantityState',
  default: 0,
});
