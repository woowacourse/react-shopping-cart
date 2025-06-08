import { useMemo } from "react";
import { Coupon } from "../types/response";
import { CartItemWithSelection } from "../../cart/types/response";
import { calculateFixedDiscount } from "../calculations/fixedCouponCalculation";
import { calculatePercentageDiscount } from "../calculations/percentageCouponCalculation";
import { calculateBuyXGetYDiscount } from "../calculations/buyXGetYCouponCalculation";
import { calculateShippingDiscount } from "../calculations/freeShippingCouponCalculation";

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

  const optimalCouponSelection = useMemo(() => {
    if (coupons.length === 0) return { selectedCoupons: [], totalDiscount: 0 };

    if (coupons.length === 1) {
      const discount = calculateCouponDiscount(coupons[0]);
      return { selectedCoupons: [coupons[0]], totalDiscount: discount };
    }

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
      ): { totalDiscount: number; order: Coupon[] } => {
        const firstDiscount = calculateCouponDiscount(first);
        const remainingPrice = Math.max(0, orderPrice - firstDiscount);
        const shippingAfterFirst =
          first.discountType === "freeShipping" ? 0 : shippingFee;
        const secondDiscount = applyCoupon(
          second,
          remainingPrice,
          shippingAfterFirst
        );

        return {
          totalDiscount: firstDiscount + secondDiscount,
          order: [first, second],
        };
      };

      const resultAB = calculateDiscountChain(couponA, couponB);
      const resultBA = calculateDiscountChain(couponB, couponA);

      return resultAB.totalDiscount >= resultBA.totalDiscount
        ? {
            selectedCoupons: resultAB.order,
            totalDiscount: resultAB.totalDiscount,
          }
        : {
            selectedCoupons: resultBA.order,
            totalDiscount: resultBA.totalDiscount,
          };
    }

    return { selectedCoupons: [], totalDiscount: 0 };
  }, [coupons, calculateCouponDiscount, orderItems, orderPrice, shippingFee]);

  return {
    selectedCoupons: optimalCouponSelection.selectedCoupons,
    totalDiscount: optimalCouponSelection.totalDiscount,
  };
};

export default useCouponDiscount;
