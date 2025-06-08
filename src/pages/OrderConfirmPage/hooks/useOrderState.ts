import { useState } from "react";
import { OrderItem } from "../types";
import { useCoupons } from "./useCoupons";

interface UseOrderStateParams {
  orderItems: OrderItem[];
}

export const useOrderState = ({ orderItems }: UseOrderStateParams) => {
  const [isIsolatedAreaSelected, setIsIsolatedAreaSelected] = useState(false);
  const { isLoading, coupons } = useCoupons();

  const toggleIsolatedArea = () => {
    setIsIsolatedAreaSelected((prev) => !prev);
  };

  return {
    orderItems,
    isLoading,
    coupons,
    isIsolatedAreaSelected,
    toggleIsolatedArea,
  };
};
