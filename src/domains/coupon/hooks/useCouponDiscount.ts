import { useMemo } from "react";
import { Coupon } from "../types/response";
import { CartItemWithSelection } from "../../cart/types/response";
import { calculateFixedDiscount } from "../calculations/fixedCouponCalculation";
import { calculatePercentageDiscount } from "../calculations/percentageCouponCalculation";
import { calculateBuyXGetYDiscount } from "../calculations/buyXGetYCouponCalculation";
import { calculateShippingDiscount } from "../calculations/freeShippingCouponCalculation";

// TODO: 얘를 굳이 커스텀훅으로 만들 필요가 있을까?

interface Props {
  coupons: Coupon[];
  orderItems: CartItemWithSelection[];
  orderPrice: number;
  shippingFee: number;
}

export const useCouponDiscount = ({
  coupons,
  orderItems,
  orderPrice,
  shippingFee,
}: Props) => {
  const calculateCouponDiscount = useMemo(() => {
    return (coupon: Coupon): number => {
      switch (coupon.discountType) {
        case "fixed":
          return calculateFixedDiscount(coupon, orderPrice);
        case "percentage":
          return calculatePercentageDiscount(coupon, orderPrice);
        case "buyXgetY":
          return calculateBuyXGetYDiscount(coupon, orderItems);
        case "freeShipping":
          return calculateShippingDiscount(coupon, orderPrice, shippingFee);
        default:
          return 0;
      }
    };
  }, [orderItems, orderPrice, shippingFee]);

  const optimalTotalDiscount = useMemo(() => {
    if (coupons.length === 0) return 0;
    if (coupons.length === 1) return calculateCouponDiscount(coupons[0]);
    if (coupons.length === 2) {
      const [couponA, couponB] = coupons;

      const applyCoupon = (
        coupon: Coupon,
        currentPrice: number,
        currentShipping: number
      ): number => {
        switch (coupon.discountType) {
          case "fixed":
            return calculateFixedDiscount(coupon, currentPrice);
          case "percentage":
            return calculatePercentageDiscount(coupon, currentPrice);
          case "buyXgetY":
            return calculateBuyXGetYDiscount(coupon, orderItems);
          case "freeShipping":
            return calculateShippingDiscount(
              coupon,
              currentPrice,
              currentShipping
            );
          default:
            return 0;
        }
      };

      const calculateDiscountChain = (
        first: Coupon,
        second: Coupon
      ): number => {
        const firstDiscount = calculateCouponDiscount(first);
        const remainingPrice = Math.max(0, orderPrice - firstDiscount);
        const shippingAfterFirst =
          first.discountType === "freeShipping" ? 0 : shippingFee;
        const secondDiscount = applyCoupon(
          second,
          remainingPrice,
          shippingAfterFirst
        );

        return firstDiscount + secondDiscount;
      };

      const discountAB = calculateDiscountChain(couponA, couponB);
      const discountBA = calculateDiscountChain(couponB, couponA);

      return Math.max(discountAB, discountBA);
    }

    return 0;
  }, [coupons, calculateCouponDiscount, orderItems, orderPrice, shippingFee]);

  return { totalDiscount: optimalTotalDiscount };
};

export default useCouponDiscount;
