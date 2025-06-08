import { useMemo } from "react";
import { OrderItem, CouponData, OrderCalculationResult } from "../types";
import { calculateOrderTotal } from "../utils/couponCalculations";

interface UseOrderCalculationParams {
  orderItems: OrderItem[];
  selectedCouponIds: number[];
  coupons: CouponData[];
  isIsolatedAreaSelected: boolean;
}

export const useOrderCalculation = ({
  orderItems,
  selectedCouponIds,
  coupons,
  isIsolatedAreaSelected,
}: UseOrderCalculationParams): OrderCalculationResult => {
  return useMemo(() => {
    if (!orderItems.length) {
      return { orderAmount: 0, couponDiscount: 0, shippingFee: 0, finalAmount: 0 };
    }

    const result = calculateOrderTotal(orderItems, selectedCouponIds, coupons, isIsolatedAreaSelected);

    return {
      orderAmount: result.orderAmount,
      couponDiscount: result.couponDiscount,
      shippingFee: result.shippingFee,
      finalAmount: result.finalAmount,
    };
  }, [orderItems, selectedCouponIds, coupons, isIsolatedAreaSelected]);
};
