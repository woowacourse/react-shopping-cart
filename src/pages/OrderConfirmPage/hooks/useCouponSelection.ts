import { useState, useCallback } from "react";

export const useCouponSelection = () => {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);
  const [isOptimized, setIsOptimized] = useState(true);

  const toggleCoupon = useCallback((couponId: number) => {
    setIsOptimized(false);
    setSelectedCouponIds((prev) => {
      if (prev.includes(couponId)) {
        return prev.filter((id) => id !== couponId);
      }
      if (prev.length >= 2) {
        return [prev[1], couponId];
      }
      return [...prev, couponId];
    });
  }, []);

  return {
    selectedCouponIds,
    isOptimized,
    canSelectMore: selectedCouponIds.length < 2,
    toggleCoupon,
  };
};
