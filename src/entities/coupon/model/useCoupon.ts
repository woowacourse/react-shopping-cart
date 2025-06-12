import { useEffect } from 'react';
import { CouponType } from '@entities/coupon/type/coupon.type';
import { useDataManager } from '@shared/model/useDataManager';
import { getCoupons } from '../api/getCoupons';

export const useCoupon = () => {
  const { state, withErrorHandling } = useDataManager<CouponType[]>([]);

  useEffect(() => {
    withErrorHandling(async () => {
      const data = await getCoupons();
      return data;
    });
  }, []);

  return {
    coupons: state.data,
    isLoading: state.isLoading,
    errorMessage: state.error,
  };
};
