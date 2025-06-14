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

  return {
    selectedCouponIds,
    handleToggleSelectedCouponId,
    handleRollbackSelectedCoupons,
  };
};

export default useSelectedCoupons;
