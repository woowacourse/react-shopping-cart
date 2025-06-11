import { useEffect } from 'react';
import { useCouponData } from '@entities/coupon/model/createCouponData';
import { couponActions } from '@entities/coupon/model/couponActions';

export const useCoupon = () => {
  const couponData = useCouponData();

  useEffect(() => {
    couponActions.fetchCoupons(couponData);
  }, []);

  return {
    coupons: couponData.coupons,
    isLoading: couponData.isLoading,
    errorMessage: couponData.errorMessage,
  };
};
