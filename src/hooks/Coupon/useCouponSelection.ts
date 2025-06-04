import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";

export interface UseCouponSelectionReturn {
  handleSelectCoupon: (id: string) => void;
  selectedCouponIds: Set<string> | undefined;
  isSelectedToLimit: boolean;
}
function useCouponSelection(
  initialSelectedIds: Set<string>
): UseCouponSelectionReturn {
  const [selectedCouponIds, setSelectedCouponIds] = useState<Set<string>>(
    initialSelectedIds ? new Set(initialSelectedIds) : new Set()
  );

  const prevInitialSelectedIds = useRef<Set<string> | undefined>(
    initialSelectedIds
  );

  useEffect(() => {
    if (!initialSelectedIds) return;

    const prevIds = prevInitialSelectedIds.current;
    if (!prevIds) {
      setSelectedCouponIds(new Set(initialSelectedIds));
      prevInitialSelectedIds.current = initialSelectedIds;
      return;
    }

    const prevIdsArray = Array.from(prevIds).sort();
    const newIdsArray = Array.from(initialSelectedIds).sort();

    if (
      prevIdsArray.length !== newIdsArray.length ||
      prevIdsArray.some((id, index) => id !== newIdsArray[index])
    ) {
      setSelectedCouponIds(new Set(initialSelectedIds));
    }

    prevInitialSelectedIds.current = initialSelectedIds;
  }, [initialSelectedIds]);

  const handleSelectCoupon = useCallback((id: string) => {
    setSelectedCouponIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (newSet.size >= MAX_COUPON_COUNT) {
          return prev;
        }
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const isSelectedToLimit = useMemo(() => {
    return selectedCouponIds
      ? selectedCouponIds.size >= MAX_COUPON_COUNT
      : false;
  }, [selectedCouponIds]);
  return {
    handleSelectCoupon,
    selectedCouponIds,
    isSelectedToLimit,
  };
}
export { useCouponSelection };
