import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useMemo, useCallback } from "react";

export interface UseCouponSelectionReturn {
  handleSelectCoupon: (id: string) => void;
  selectedCouponIds: Set<string>;
  isSelectedToLimit: boolean;
  isError: boolean;
  resetToOptimal: (optimalIds: Set<string>) => void;
}

function useCouponSelection(
  initialSelectedIds: Set<string> = new Set()
): UseCouponSelectionReturn {
  const [isError, setIsError] = useState(false);
  const [selectedCouponIds, setSelectedCouponIds] = useState(
    () => new Set(initialSelectedIds)
  );

  const handleSelectCoupon = useCallback((id: string) => {
    setSelectedCouponIds((prev) => {
      const isCurrentlySelected = prev.has(id);
      const isTryingToAdd =
        !isCurrentlySelected && prev.size >= MAX_COUPON_COUNT;

      if (isTryingToAdd) {
        setIsError(true);
        return prev;
      }

      setIsError(false);

      const next = new Set(prev);
      if (isCurrentlySelected) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const resetToOptimal = useCallback((optimalIds: Set<string>) => {
    setSelectedCouponIds(new Set(optimalIds));
    setIsError(false);
  }, []);

  const isSelectedToLimit = useMemo(
    () => selectedCouponIds.size >= MAX_COUPON_COUNT,
    [selectedCouponIds]
  );

  return {
    handleSelectCoupon,
    selectedCouponIds,
    isSelectedToLimit,
    isError,
    resetToOptimal,
  };
}
export { useCouponSelection };
