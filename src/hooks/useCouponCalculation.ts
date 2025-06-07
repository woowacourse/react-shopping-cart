import { useMemo } from "react";
import { Coupon } from "../api/couponApi";
import { ResponseCartItem } from "../types/types";
import {
  calculateSelectedCouponsDiscount,
  findOptimalCouponCombination,
  OrderInfo,
  CouponCalculationResult,
} from "../utils/couponCalculator";

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
  const orderInfo: OrderInfo = useMemo(() => {
    const originalOrderAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const baseDeliveryFee = originalOrderAmount >= 100000 ? 0 : 3000;
    const remoteAreaFee = isRemoteArea ? 3000 : 0;
    const originalDeliveryFee = baseDeliveryFee + remoteAreaFee;

    return {
      cartItems,
      originalOrderAmount,
      originalDeliveryFee,
      isRemoteArea,
    };
  }, [cartItems, isRemoteArea]);

  const selectedCouponResult = useMemo(() => {
    return calculateSelectedCouponsDiscount(selectedCoupons, orderInfo);
  }, [selectedCoupons, orderInfo]);

  const optimalCouponResult = useMemo(() => {
    return findOptimalCouponCombination(availableCoupons, orderInfo);
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
