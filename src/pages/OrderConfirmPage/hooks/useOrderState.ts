import { useState } from "react";
import { CouponData, OrderItem } from "../types";
import { useCoupons } from "./useCoupons";
import { useCouponSelection } from "./useCouponSelection";

interface UseOrderStateParams {
  orderItems: OrderItem[];
}

export const useOrderState = ({ orderItems }: UseOrderStateParams) => {
  const [isIsolatedAreaSelected, setIsIsolatedAreaSelected] = useState(false);
  const { isLoading, coupons } = useCoupons();

  const { selectedCouponIds, isOptimized, canSelectMore, toggleCoupon } = useCouponSelection();

  const toggleIsolatedArea = () => {
    setIsIsolatedAreaSelected((prev) => !prev);
  };

  return {
    orderItems,
    isLoading,
    availableCoupons: coupons as CouponData[],
    isIsolatedAreaSelected,
    toggleIsolatedArea,
    selectedCouponIds,
    isOptimized,
    canSelectMore,
    toggleCoupon,
  };
};
