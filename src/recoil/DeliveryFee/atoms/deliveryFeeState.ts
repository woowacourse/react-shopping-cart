import { atom } from 'recoil';

export const deliveryFeeState = atom<number>({
  key: 'deliveryFeeState',
  default: 0,
});
