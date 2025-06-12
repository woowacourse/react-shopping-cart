import { useState } from "react";
import { CheckedMap } from "../types/CheckMap";

const MAX_COUPON_COUNT = 2;

interface useSelectedCouponsReturn {
  selectedCoupons: Map<number, boolean>;
  initializeSelectedCoupons: (initialMap: CheckedMap) => void;
  toggleCoupon: (couponId: number) => void;
  resetCoupons: () => void;
  isSelected: (couponId: number) => boolean;
}

const useSelectedCoupons = (): useSelectedCouponsReturn => {
  const [selectedCoupons, setSelectedCoupons] = useState<CheckedMap>(new Map());

  const initializeSelectedCoupons = (initialMap: CheckedMap) => {
    setSelectedCoupons(new Map(initialMap));
  };

  const resetCoupons = () => {
    setSelectedCoupons(new Map());
  };
  const toggleCoupon = (couponId: number) => {
    setSelectedCoupons((prev: CheckedMap) => {
      const newMap = new Map(prev);

      if (newMap.has(couponId)) {
        newMap.delete(couponId);
        return newMap;
      }

      if (newMap.size >= MAX_COUPON_COUNT) {
        return newMap;
      }

      newMap.set(couponId, true);
      return newMap;
    });
  };

  const isSelected = (couponId: number) => selectedCoupons.has(couponId);

  return {
    selectedCoupons,
    initializeSelectedCoupons,
    resetCoupons,
    toggleCoupon,
    isSelected,
  };
};

export default useSelectedCoupons;
