import { useState, useCallback, useMemo, useEffect } from "react";
import { CouponData, OrderItem } from "../../../types";
import { findOptimalCouponCombination } from "../../../utils/couponCalculations";
import { COUPON_LIMIT } from "../../../constants";

interface UseCouponSelectionParams {
  coupons: CouponData[];
  orderItems: OrderItem[];
  isIsolatedAreaSelected: boolean;
}

export const useCouponSelection = ({ coupons, orderItems, isIsolatedAreaSelected }: UseCouponSelectionParams) => {
  const [selectedCouponIds, setSelectedCouponIds] = useState<number[]>([]);

  const optimalCouponIds = useMemo(() => {
    const orderAmount = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return findOptimalCouponCombination(coupons, orderItems, orderAmount, isIsolatedAreaSelected);
  }, [coupons, orderItems, isIsolatedAreaSelected]);

  useEffect(() => {
    if (optimalCouponIds.length > 0 && selectedCouponIds.length === 0) {
      setSelectedCouponIds(optimalCouponIds);
    }
  }, [optimalCouponIds]);

  const toggleCoupon = useCallback((couponId: number) => {
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

  const selectOptimalCoupons = useCallback(() => {
    setSelectedCouponIds(optimalCouponIds);
  }, [optimalCouponIds]);

  const isOptimalSelection = useMemo(() => {
    if (optimalCouponIds.length === 0 && selectedCouponIds.length === 0) return true;
    return JSON.stringify([...selectedCouponIds].sort()) === JSON.stringify([...optimalCouponIds].sort());
  }, [selectedCouponIds, optimalCouponIds]);

  return {
    selectedCouponIds,
    isOptimalSelection,
    canSelectMore: selectedCouponIds.length < COUPON_LIMIT,
    toggleCoupon,
    selectOptimalCoupons,
  };
};
