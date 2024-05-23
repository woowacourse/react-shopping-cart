import { atom } from 'recoil';

export const selectedCouponTotalDiscountState = atom<number>({
  key: 'selectedCouponTotalDiscountState',
  default: 0,
});
