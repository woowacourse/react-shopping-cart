import { CouponContent } from '@/api/type';
import { useCoupon } from '@/hooks/useCoupon';
import { useEffect, useRef, useState } from 'react';
import { getAllCouponCombinationIds } from '../utils/getAllCouponCombinationIds';
import { useAvailableCoupons } from './useAvailableCoupons';
import { useBestCouponCombination } from './useBestCouponCombination';

export const useOrderCoupons = (isJejuOrRemoteArea: boolean) => {
  const { coupons, isLoading } = useCoupon();

  const { availableCoupons } = useAvailableCoupons(
    coupons ?? [],
    isJejuOrRemoteArea
  );

  const [allCouponCombinationIds, setAllCouponCombinationIds] = useState<
    number[][]
  >([]);
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const isManual = useRef(false);

  const { bestCouponIds, totalDiscount } = useBestCouponCombination(
    availableCoupons,
    allCouponCombinationIds,
    isJejuOrRemoteArea
  );

  // 2. availableCoupons 값이 바뀌면 갱신
  useEffect(() => {
    setAllCouponCombinationIds(getAllCouponCombinationIds(availableCoupons));
  }, [availableCoupons]);

  useEffect(() => {
    if (!isManual.current) {
      setSelectedCouponIds(bestCouponIds);
    }
  }, [bestCouponIds]);

  const handleUpdateCouponCombinations = (coupons: CouponContent[]) => {
    const combinations = getAllCouponCombinationIds(coupons);
    setAllCouponCombinationIds(combinations);
  };

  const handleSelectCoupons = (newCoupons: number[]) => {
    isManual.current = true;
    setSelectedCouponIds(newCoupons);

    // ID로 쿠폰 객체 찾아서 조합 업데이트
    if (coupons) {
      const selectedCouponObjects = coupons.filter((coupon) =>
        newCoupons.includes(coupon.id)
      );
      handleUpdateCouponCombinations(selectedCouponObjects);
    }
  };

  return {
    coupons,
    isLoading,

    availableCoupons,
    allCouponCombinationIds,
    selectedCouponIds,
    bestCouponIds,
    totalDiscount,

    // 핸들러
    handleSelectCoupons,
  };
};
