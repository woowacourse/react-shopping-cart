import { useMemo } from "react";
import { Coupon } from "../types/response";

interface OrderCalculator {
  orderPrice: number;
}

const useCouponValidation = (calculator: OrderCalculator) => {
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().substring(0, 8);

  const validateCoupon = useMemo(() => {
    return (coupon: Coupon): boolean => {
      const isNotExpired = coupon.expirationDate >= currentDate;
      if (!isNotExpired) return false;

      const meetsMinimumAmount =
        !coupon.minimumAmount || calculator.orderPrice >= coupon.minimumAmount;
      if (!meetsMinimumAmount) return false;

      if (coupon.availableTime) {
        const { start, end } = coupon.availableTime;
        const isWithinTimeRange = currentTime >= start && currentTime <= end;
        if (!isWithinTimeRange) return false;
      }

      return true;
    };
  }, [currentDate, currentTime, calculator.orderPrice]);

  return {
    validateCoupon,
  };
};

export default useCouponValidation;
