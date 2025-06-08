import { useState, useCallback } from "react";

const useSelectedCoupons = (initialSelectedCouponIds: number[] = []) => {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>(
    initialSelectedCouponIds
  );

  const handleToggleSelectedCouponId = useCallback((id: number) => {
    setSelectedCouponIds((prevSelectedCouponIds) => {
      if (!prevSelectedCouponIds.includes(id)) {
        return [...prevSelectedCouponIds, id];
      }

      return prevSelectedCouponIds.filter((couponId) => couponId !== id);
    });
  }, []);

  const handleRollbackSelectedCoupons = useCallback(() => {
    setSelectedCouponIds(initialSelectedCouponIds);
  }, [initialSelectedCouponIds]);

  const handleUseCoupons = useCallback((idList: number[]) => {
    setSelectedCouponIds(idList);
  }, []);

  return {
    selectedCouponIds,
    handleToggleSelectedCouponId,
    handleRollbackSelectedCoupons,
    handleUseCoupons,
  };
};

export default useSelectedCoupons;
