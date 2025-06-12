import { useEffect, useState } from "react";
import { useCoupons } from "./useCoupons";
import { useCouponSelection } from "./useCouponSelection";
import { useOrderCalculation } from "./useOrderCalculation";
import { OrderItem } from "../../../types";

interface UseOrderStateParams {
  orderItems: OrderItem[];
}

export const useOrderState = ({ orderItems }: UseOrderStateParams) => {
  const [isIsolatedAreaSelected, setIsIsolatedAreaSelected] = useState(false);
  const { isLoading, coupons } = useCoupons();

  const { selectedCouponIds, isOptimized, canSelectMore, toggleCoupon, selectOptimalCoupons } = useCouponSelection({
    coupons,
    orderItems,
    isIsolatedAreaSelected,
  });

  const calculation = useOrderCalculation({
    orderItems,
    selectedCouponIds,
    coupons,
    isIsolatedAreaSelected,
  });

  const toggleIsolatedArea = () => {
    setIsIsolatedAreaSelected((prev) => !prev);
  };

  useEffect(() => {
    if (isOptimized) {
      selectOptimalCoupons();
    }
  }, [isOptimized, selectOptimalCoupons]);

  return {
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
