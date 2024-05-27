import fetcher from './fetcher';

import { Coupon } from '@/types/coupon';
import { REQUEST_URL } from '@constants/url';

export const fetchCouponList = async (): Promise<Coupon[]> => {
  const res = await fetcher.get({ requestUrl: REQUEST_URL.coupons });
  const result = await res.json();

  return result;
};
