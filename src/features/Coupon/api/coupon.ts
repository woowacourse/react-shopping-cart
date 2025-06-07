import { fetcher } from '@/api/fetcher';
import { CouponResponse } from '../types/Coupon.types';

export const getCouponList = async () => {
  const data = await fetcher.get<CouponResponse[]>({
    path: 'coupons',
  });

  return data;
};
