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

      // 추가하려는데 한도에 도달한 경우 실패
      if (isTryingToAdd) {
        return false;
      }

      // 성공 케이스 - 상태 업데이트
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
