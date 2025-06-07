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

    const combinations: Coupon[][] = [];
    coupons.forEach((coupon) => combinations.push([coupon]));

    for (let i = 0; i < coupons.length; i++) {
      for (let j = i + 1; j < coupons.length; j++) {
        combinations.push([coupons[i], coupons[j]]);
      }
    }

    const results = combinations.map((couponSet) => {
      const totalDiscount = couponSet.reduce(
        (sum, coupon) => sum + calculateCouponDiscount(coupon),
        0
      );
      return { selectedCoupons: couponSet, totalDiscount };
    });

    return results.reduce(
      (best, current) => {
        return current.totalDiscount > best.totalDiscount ? current : best;
      },
      { selectedCoupons: [], totalDiscount: 0 }
    );
  }, [coupons, calculateCouponDiscount]);

  return {
    totalDiscount: optimalCouponSelection.totalDiscount,
    discountedPrice: Math.max(
      0,
      orderPrice - optimalCouponSelection.totalDiscount
    ),
    finalShippingFee: optimalCouponSelection.selectedCoupons.some(
      (c) => c.discountType === "freeShipping"
    )
      ? 0
      : shippingFee,
  };
};

export default useCouponDiscount;
