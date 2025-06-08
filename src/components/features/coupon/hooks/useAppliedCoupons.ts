import { useCallback, useState } from 'react';

function useAppliedCoupons() {
  const [applied, setApplied] = useState<Set<number>>(new Set());

  const applyCouponIds = useCallback((ids: Set<number>) => {
    setApplied(new Set(ids));
  }, []);

  const isApplied = useCallback((id: number) => applied.has(id), [applied]);

  return {
    appliedCouponIds: applied,
    applyCouponIds,
    isCouponApplied: isApplied,
  };
}

export default useAppliedCoupons;
