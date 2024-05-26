import { useRecoilValue } from 'recoil';
import { couponsState, appliedCouponIdsState } from '../recoil/atoms';

import useDiscountCalculator from './useDiscountCalculator';
import useCouponValidityChecker from './useCouponValidityChecker';

export default function useCoupons() {
  const coupons = useRecoilValue(couponsState);
  const appliedCouponIds = useRecoilValue(appliedCouponIdsState);

  const { isCouponValid } = useCouponValidityChecker();
  const { getDiscountAmount } = useDiscountCalculator();

  const hasUsableCoupon = () => {
    const useableCouponCount = coupons.reduce((couponCount, coupon) => {
      if (isCouponValid(coupon)) couponCount += 1;
      return couponCount;
    }, 0);

    return useableCouponCount ? true : false;
  };

  const calculateDiscountAmount = (couponIds?: number[]) => {
    const ids = couponIds ?? appliedCouponIds;
    return getDiscountAmount(ids);
  };

  return {
    coupons,
    hasUsableCoupon: hasUsableCoupon(),
    calculateDiscountAmount,
  };
}
