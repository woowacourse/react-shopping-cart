import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useErrorToast } from "@/contexts/ErrorToastContext";

function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

export interface UseCouponSelectionReturn {
  handleSelectCoupon: (id: string) => void;
  selectedCouponIds: Set<string>;
  isSelectedToLimit: boolean;
}

function useCouponSelection(
  initialSelectedIds: Set<string> = new Set()
): UseCouponSelectionReturn {
  const { showError } = useErrorToast();
  const [selectedCouponIds, setSelectedCouponIds] = useState(
    () => new Set(initialSelectedIds)
  );

  const showErrorRef = useRef(showError);
  showErrorRef.current = showError;

  const prevInitialIdsRef = useRef(initialSelectedIds);

  useEffect(() => {
    const prevInitialIds = prevInitialIdsRef.current;

    if (!areSetsEqual(prevInitialIds, initialSelectedIds)) {
      setSelectedCouponIds(new Set(initialSelectedIds));
    }

    prevInitialIdsRef.current = initialSelectedIds;
  }, [initialSelectedIds]);

  const handleSelectCoupon = useCallback((id: string) => {
    setSelectedCouponIds((prev) => {
      const isCurrentlySelected = prev.has(id);
      const isTryingToAdd =
        !isCurrentlySelected && prev.size >= MAX_COUPON_COUNT;

      if (isTryingToAdd) {
        showErrorRef.current(new Error("최대 쿠폰 선택 수를 초과했습니다."));
        return prev;
      }

      const next = new Set(prev);
      if (isCurrentlySelected) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const isSelectedToLimit = useMemo(
    () => selectedCouponIds.size >= MAX_COUPON_COUNT,
    [selectedCouponIds]
  );

  return { handleSelectCoupon, selectedCouponIds, isSelectedToLimit };
}
export { useCouponSelection };
