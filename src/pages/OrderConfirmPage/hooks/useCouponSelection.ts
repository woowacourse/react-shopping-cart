import { useState, useCallback, useMemo } from "react";
import { CouponData, OrderItem } from "../types";
import { findOptimalCouponCombination } from "../utils/couponCalculations";
import { COUPON_LIMIT } from "../constants";

interface UseCouponSelectionParams {
  coupons: CouponData[];
  orderItems: OrderItem[];
  isIsolatedAreaSelected: boolean;
}

export const useCouponSelection = ({ coupons, orderItems, isIsolatedAreaSelected }: UseCouponSelectionParams) => {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);
  const [isOptimized, setIsOptimized] = useState(true);

  const optimalCouponIds = useMemo(() => {
    const orderAmount = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return findOptimalCouponCombination(coupons, orderItems, orderAmount, isIsolatedAreaSelected);
  }, [coupons, orderItems, isIsolatedAreaSelected]);

  const selectOptimalCoupons = useCallback(() => {
    setSelectedCouponIds(optimalCouponIds);
    setIsOptimized(true);
  }, [optimalCouponIds]);

  const toggleCoupon = useCallback((couponId: number) => {
    setIsOptimized(false);
    setSelectedCouponIds((prev) => {
      if (prev.includes(couponId)) {
        return prev.filter((id) => id !== couponId);
      }
      if (prev.length >= COUPON_LIMIT) {
        return [prev[1], couponId];
      }
      return [...prev, couponId];
    });
  }, []);

  return {
    selectedCouponIds,
    isOptimized,
    canSelectMore: selectedCouponIds.length < COUPON_LIMIT,
    toggleCoupon,
    selectOptimalCoupons,
  };
};
