import { CouponResponse } from '@/features/Order/Checkout/type/coupon.type';

import { fetcher } from './fetcher';

export const getCoupons = async () => {
  return await fetcher.get<CouponResponse[]>({
    path: 'coupons',
  });
};
