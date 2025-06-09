import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useCallback } from "react";

function useCouponSelection(
  initialSelectedIds: string[] = []
): [Set<string>, (id: string) => boolean, (optimalIds: string[]) => void] {
  const [selectedCouponIds, setSelectedCouponIds] = useState(
    () => new Set(initialSelectedIds)
  );

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

  return [selectedCouponIds, toggleCoupon, resetToOptimal];
}

export { useCouponSelection };
