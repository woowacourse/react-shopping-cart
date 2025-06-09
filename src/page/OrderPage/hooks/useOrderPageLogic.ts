import { useState } from "react";
import { useCouponManagement } from "@/hooks/Coupon/useCouponManagement";
import { CartItem } from "@/type/CartItem";

export function useOrderPageLogic(selectedCartItems: CartItem[]) {
  const [isInIsland, setIsInIsland] = useState(false);

  const couponManagement = useCouponManagement({
    selectedShoppingCartItems: selectedCartItems,
    isIsland: isInIsland,
  });

  return {
    isInIsland,
    setIsInIsland,
    ...couponManagement,
  };
}
