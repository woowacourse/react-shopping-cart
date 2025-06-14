import { useState } from 'react';

export const useCouponSelection = () => {
  const [checkedCoupons, setCheckedCoupons] = useState<Set<number>>(new Set());
  const [isAutoMode, setIsAutoMode] = useState(true);

  const applyCoupon = (id: number, currentlyChecked?: boolean) => {
    if (!checkedCoupons.has(id) && checkedCoupons.size === 2) return;

    setCheckedCoupons((prev) => {
      const newSet = new Set(prev);
      if (isAutoMode) setIsAutoMode(false);

      const isCurrentlyInSet = currentlyChecked ? currentlyChecked : newSet.has(id);

      if (isCurrentlyInSet) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return {
    checkedCoupons,
    isAutoMode,
    setIsAutoMode,
    applyCoupon,
  };
};
