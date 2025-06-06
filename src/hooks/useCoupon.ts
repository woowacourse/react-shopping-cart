import { useState } from 'react';
import { getCouponData } from '@/api/coupon';
import { useApiRequest } from '@/hooks/useApiRequest';
import { CouponContent } from '@/api/type';

export const useCoupon = () => {
  const [coupons, setCoupons] = useState<CouponContent[] | null>(null);
  const { isLoading, handleRequest } = useApiRequest();

  const fetchCoupons = () => {
    return handleRequest({
      request: () => getCouponData(),
      onSuccess: (data) => {
        setCoupons(data);
        return data;
      },
    });
  };

  return {
    coupons,
    isLoading,
    fetchCoupons,
  };
};
