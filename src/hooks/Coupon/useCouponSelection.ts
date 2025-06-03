import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";

export interface UseCouponSelectionReturn {
  handleSelectCoupon: (id: string) => void;
  selectedCouponIds: Set<string> | undefined;
  isSelectedToLimit: boolean;
}
function useCouponSelection(
  initialSelectedIds?: Set<string>
): UseCouponSelectionReturn {
  const [selectedCouponIds, setSelectedCouponIds] = useState<Set<string>>(
    initialSelectedIds ? new Set(initialSelectedIds) : new Set()
  );

  // 이전 initialSelectedIds를 기억하기 위한 ref
  const prevInitialSelectedIds = useRef<Set<string> | undefined>(
    initialSelectedIds
  );

  // initialSelectedIds가 실제로 변경되었을 때만 상태 업데이트
  useEffect(() => {
    if (!initialSelectedIds) return;

    // 이전 값과 현재 값을 비교
    const prevIds = prevInitialSelectedIds.current;
    if (!prevIds) {
      setSelectedCouponIds(new Set(initialSelectedIds));
      prevInitialSelectedIds.current = initialSelectedIds;
      return;
    }

    // Set의 내용이 실제로 변경되었는지 확인
    const prevIdsArray = Array.from(prevIds).sort();
    const newIdsArray = Array.from(initialSelectedIds).sort();

    if (
      prevIdsArray.length !== newIdsArray.length ||
      prevIdsArray.some((id, index) => id !== newIdsArray[index])
    ) {
      setSelectedCouponIds(new Set(initialSelectedIds));
    }

    prevInitialSelectedIds.current = initialSelectedIds;
  }, [initialSelectedIds]); // selectedCouponIds 제거!

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
export default useCouponSelection;
