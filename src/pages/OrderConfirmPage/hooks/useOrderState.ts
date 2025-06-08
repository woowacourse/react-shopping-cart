import { useState } from "react";
import { OrderItem } from "../types";
import { useCoupons } from "./useCoupons";
import { useCouponSelection } from "./useCouponSelection";
import { useOrderCalculation } from "./useOrderCalculation";

interface UseOrderStateParams {
  orderItems: OrderItem[];
}

export const useOrderState = ({ orderItems }: UseOrderStateParams) => {
  const [isIsolatedAreaSelected, setIsIsolatedAreaSelected] = useState(false);
  const { isLoading, coupons } = useCoupons();

  const { selectedCouponIds, isOptimized, canSelectMore, toggleCoupon } = useCouponSelection();

  const calculation = useOrderCalculation({
    orderItems,
    selectedCouponIds,
    coupons,
    isIsolatedAreaSelected,
  });

  const toggleIsolatedArea = () => {
    setIsIsolatedAreaSelected((prev) => !prev);
  };

  return {
    orderItems,
    isLoading,
    availableCoupons: coupons,
    isIsolatedAreaSelected,
    toggleIsolatedArea,
    selectedCouponIds,
    isOptimized,
    canSelectMore,
    toggleCoupon,
    calculation,
  };
};
