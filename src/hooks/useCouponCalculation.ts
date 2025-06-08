import { useMemo } from "react";
import { Coupon, CouponCalculationResult } from "../types/coupon";
import { ResponseCartItem } from "../types/order";
import { OrderService } from "../services/orderService";
import { CouponCalculator } from "../utils/couponCalculator";

interface UseCouponCalculationProps {
  cartItems: ResponseCartItem[];
  isRemoteArea: boolean;
  selectedCoupons?: Coupon[];
  availableCoupons?: Coupon[];
}

interface UseCouponCalculationReturn {
  orderAmount: number;
  deliveryFee: number;
  selectedCouponResult: CouponCalculationResult;
  optimalCouponResult: CouponCalculationResult;
  finalTotalAmount: number;
}

export const useCouponCalculation = ({
  cartItems,
  isRemoteArea,
  selectedCoupons = [],
  availableCoupons = [],
}: UseCouponCalculationProps): UseCouponCalculationReturn => {
  const orderInfo = useMemo(() => {
    return OrderService.createOrderInfo(cartItems, isRemoteArea);
  }, [cartItems, isRemoteArea]);

  const selectedCouponResult = useMemo(() => {
    return CouponCalculator.calculateSelectedCouponsDiscount(
      selectedCoupons,
      orderInfo
    );
  }, [selectedCoupons, orderInfo]);

  const optimalCouponResult = useMemo(() => {
    return CouponCalculator.findOptimalCouponCombination(
      availableCoupons,
      orderInfo
    );
  }, [availableCoupons, orderInfo]);

  const finalTotalAmount = useMemo(() => {
    return (
      selectedCouponResult.finalOrderAmount +
      selectedCouponResult.finalDeliveryFee
    );
  }, [selectedCouponResult]);

  return {
    orderAmount: orderInfo.originalOrderAmount,
    deliveryFee: orderInfo.originalDeliveryFee,
    selectedCouponResult,
    optimalCouponResult,
    finalTotalAmount,
  };
};
