import { useEffect, useState } from "react";
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

  const navigateState = {
    orderItemsKind: orderItems.length,
    totalOrderItemsCount: orderItems.reduce((acc, item) => acc + item.quantity, 0),
    totalPrice: calculation.finalAmount,
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
    navigateState,
  };
};
