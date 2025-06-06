import { getCoupons } from '@/api/order';
import { useFetchData } from '@/shared/hooks/useFetchData';

import { CouponResponse } from '../type/coupon.type';

export const useCoupons = () => {
  const coupons = useFetchData<CouponResponse[]>({ autoFetch: getCoupons });

  return {
    coupons: coupons.data,
  };
};
