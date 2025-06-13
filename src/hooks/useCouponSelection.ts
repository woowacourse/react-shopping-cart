import { useState, useCallback } from 'react';
import { CouponType } from '../types/cart';
import { MAX_COUPON_COUNT } from '../constants/coupon';

export function useCouponSelection() {
  const [selectedCoupons, setSelectedCoupons] = useState<CouponType[]>([]);

  const handleCouponSelect = useCallback((coupon: CouponType) => {
    setSelectedCoupons((prev) => {
      const isSelected = prev.some((c) => c.id === coupon.id);
      if (isSelected) {
        return prev.filter((c) => c.id !== coupon.id);
      }
      if (prev.length >= MAX_COUPON_COUNT) {
        return prev;
      }
      return [...prev, coupon];
    });
  }, []);

  return {
    selectedCoupons,
    handleCouponSelect,
  };
}
