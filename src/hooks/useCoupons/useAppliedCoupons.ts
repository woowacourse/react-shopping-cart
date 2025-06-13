import { useState, useCallback } from "react";

const useAppliedCoupons = () => {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const handleUseCoupons = useCallback((idList: number[]) => {
    setSelectedCouponIds(idList);
  }, []);

  return {
    selectedCouponIds,
    handleUseCoupons,
  };
};

export default useAppliedCoupons;
