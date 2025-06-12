import { useCoupon } from '@/hooks/useCoupon';
import { useAvailableCoupons } from './useAvailableCoupons';
import { useBestCouponCombination } from './useBestCouponCombination';

export const useOrderCoupons = (isJejuOrRemoteArea: boolean) => {
  const { coupons, isLoading } = useCoupon();
  const { availableCoupons } = useAvailableCoupons(
    coupons ?? [],
    isJejuOrRemoteArea
  );
  const { bestCouponIds, totalDiscount } = useBestCouponCombination(
    availableCoupons,
    isJejuOrRemoteArea
  );

  return {
    coupons,
    isLoading,

    availableCoupons,
    bestCouponIds,
    totalDiscount,
  };
};
