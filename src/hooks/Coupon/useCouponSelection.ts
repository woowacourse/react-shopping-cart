import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useEffect } from "react";

function useCouponSelection(initialSelectedIds: Set<string> = new Set()) {
  const [selectedCouponIds, setSelectedCouponIds] =
    useState<Set<string>>(initialSelectedIds);

  useEffect(() => {
    setSelectedCouponIds(initialSelectedIds);
  }, [initialSelectedIds]);

  const handleSelectCoupon = (id: string) => {
    setSelectedCouponIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  const isSelectedToLimit = selectedCouponIds.size >= MAX_COUPON_COUNT;

  return {
    handleSelectCoupon,
    selectedCouponIds,
    isSelectedToLimit,
  };
}

export default useCouponSelection;
