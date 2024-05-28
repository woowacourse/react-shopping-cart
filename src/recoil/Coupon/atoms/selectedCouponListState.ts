import { atom } from 'recoil';

import type { Coupon } from '../../../types/Coupon';

export const selectedCouponListState = atom<Coupon[]>({
  key: 'selectedCouponListState',
  default: [],
});
