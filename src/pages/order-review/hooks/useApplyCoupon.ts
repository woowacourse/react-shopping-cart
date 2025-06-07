// hooks/useApplyCoupon.ts
import { CouponContent } from '@/api/type';
import { useAvailableCoupons } from './useAvailableCoupons';
import { useCouponCombinations } from './useCouponCombinations';
import { useBestCouponCombination } from './useBestCouponCombination';

export const useApplyCoupon = (
  coupons: CouponContent[],
  isJejuOrRemoteArea: boolean
) => {
  const { availableCoupons } = useAvailableCoupons(coupons, isJejuOrRemoteArea);
  const { allCouponCombinationIds } = useCouponCombinations(availableCoupons);
  const { bestCombination } = useBestCouponCombination(
    availableCoupons,
    allCouponCombinationIds,
    isJejuOrRemoteArea
  );

  return {
    availableCoupons,
    bestCouponIds: bestCombination.couponIds,
    totalDiscount: bestCombination.discount,
  };
};
