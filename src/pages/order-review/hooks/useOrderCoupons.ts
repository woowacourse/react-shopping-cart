import { useCoupon } from '@/hooks/useCoupon';
import { useRef, useState } from 'react';
import { useAvailableCoupons } from './useAvailableCoupons';
import { useBestCouponCombination } from './useBestCouponCombination';

export const useOrderCoupons = (isJejuOrRemoteArea: boolean) => {
  const { coupons, isLoading } = useCoupon();

  const { availableCoupons } = useAvailableCoupons(
    coupons ?? [],
    isJejuOrRemoteArea
  );

  const isManual = useRef(false);

  const { bestCouponIds, totalDiscount } = useBestCouponCombination(
    availableCoupons,
    isJejuOrRemoteArea
  );

  const [selectedCouponIds, setSelectedCouponIds] =
    useState<number[]>(bestCouponIds);

  const handleSelectCoupons = (newCoupons: number[]) => {
    isManual.current = true;
    setSelectedCouponIds(newCoupons);
  };

  return {
    coupons,
    isLoading,

    availableCoupons,
    selectedCouponIds,
    bestCouponIds,
    totalDiscount,

    handleSelectCoupons,
  };
};
