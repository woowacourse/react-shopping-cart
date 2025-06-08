import { useMemo } from "react";
import { Coupon } from "../types/coupon";
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
  finalOrderAmount: number;
  finalDeliveryFee: number;
  totalDiscount: number;
  deliveryDiscount: number;
  finalTotalAmount: number;
}

export const useCouponCalculation = ({
  cartItems,
  isRemoteArea,
  selectedCoupons = [],
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

  const finalTotalAmount = useMemo(() => {
    return (
      selectedCouponResult.finalOrderAmount +
      selectedCouponResult.finalDeliveryFee
    );
  }, [selectedCouponResult]);

  return {
    finalOrderAmount: selectedCouponResult.finalOrderAmount,
    finalDeliveryFee: selectedCouponResult.finalDeliveryFee,
    totalDiscount: selectedCouponResult.totalDiscount,
    deliveryDiscount: selectedCouponResult.deliveryDiscount,
    finalTotalAmount,
  };
};
