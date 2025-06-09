import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import {
  calculateCouponDiscount,
  CouponDiscountResult,
} from "./calculateCouponDiscount";

export interface CouponWithEffectiveness {
  coupon: Coupon;
  discountResult: CouponDiscountResult;
}

export const evaluateCouponEffectiveness = (
  coupons: Coupon[],
  cartItems: CartItem[],
  orderTotal: number,
  isIsland: boolean = false
): CouponWithEffectiveness[] => {
  const evaluatedCoupons = coupons.map((coupon) => {
    const discountResult = calculateCouponDiscount(
      coupon,
      cartItems,
      orderTotal,
      isIsland
    );

    return {
      coupon,
      discountResult,
    };
  });

  return evaluatedCoupons.sort(
    (a, b) => b.discountResult.totalDiscount - a.discountResult.totalDiscount
  );
};
