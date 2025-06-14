import { useState } from "react";
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

  const { selectedCouponIds, canSelectMore, toggleCoupon } = useCouponSelection({
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

  return {
    isLoading,
    availableCoupons: coupons,
    isIsolatedAreaSelected,
    toggleIsolatedArea,
    selectedCouponIds,
    canSelectMore,
    toggleCoupon,
    calculation,
  };
};
