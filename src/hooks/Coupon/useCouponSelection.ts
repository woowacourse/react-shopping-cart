import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useCallback } from "react";

interface UseCouponSelectionReturn {
  selectedCouponIds: Set<string>;
  toggleCoupon: (id: string) => boolean;
  resetToOptimal: (optimalIds: string[]) => void;
}

function useCouponSelection(): UseCouponSelectionReturn {
  const [selectedCouponIds, setSelectedCouponIds] = useState(new Set<string>());

  const toggleCoupon = useCallback(
    (id: string): boolean => {
      const isCurrentlySelected = selectedCouponIds.has(id);
      const isTryingToAdd =
        !isCurrentlySelected && selectedCouponIds.size >= MAX_COUPON_COUNT;

      if (isTryingToAdd) {
        return false;
      }

      setSelectedCouponIds((prev) => {
        const next = new Set(prev);
        if (isCurrentlySelected) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });

      return true;
    },
    [selectedCouponIds]
  );

  const resetToOptimal = useCallback((optimalIds: string[]) => {
    setSelectedCouponIds(new Set(optimalIds));
  }, []);

  return { selectedCouponIds, toggleCoupon, resetToOptimal };
}

export { useCouponSelection };
