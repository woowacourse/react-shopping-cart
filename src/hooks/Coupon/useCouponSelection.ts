import { MAX_COUPON_COUNT } from "@/constants/priceSetting";
import { useState, useEffect, useMemo } from "react";

function useCouponSelection(initialSelectedIds?: Set<string>) {
  const [selectedCouponIds, setSelectedCouponIds] = useState<Set<string>>(() =>
    initialSelectedIds ? new Set(initialSelectedIds) : new Set()
  );

  // initialSelectedIds의 요소를 정렬하여 문자열로 만든다.
  // 이 문자열(initialKey)이 바뀔 때만 "실제 내용이 바뀐 것"으로 판단함.
  const initialKey = useMemo(() => {
    if (!initialSelectedIds || initialSelectedIds.size === 0) {
      return "";
    }
    return Array.from(initialSelectedIds).sort().join(",");
  }, [initialSelectedIds]);

  // initialKey(내용)가 변할 때만 selectedCouponIds를 덮어쓴다
  useEffect(() => {
    if (!initialSelectedIds) return;
    setSelectedCouponIds(new Set(initialSelectedIds));
  }, [initialKey]);

  const handleSelectCoupon = (id: string) => {
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
  };

  const isSelectedToLimit = selectedCouponIds.size >= MAX_COUPON_COUNT;

  return {
    handleSelectCoupon,
    selectedCouponIds,
    isSelectedToLimit,
  };
}

export default useCouponSelection;
