import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState } from "react";

function useCouponSelection() {
  const [selectedCouponIds, setSelectedCouponIds] = useState<Set<string>>(
    new Set()
  );

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
