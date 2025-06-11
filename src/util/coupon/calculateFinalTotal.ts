import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { calculateOrderTotal } from "./calculateOrderTotal";
import { calculateCouponDiscount } from "./calculateCouponDiscount";
import { getBaseShipping } from "./getBaseShipping";

export interface FinalCalculationResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
  appliedCoupons: Array<{
    coupon: Coupon;
    discountItem: number;
    discountShipping: number;
  }>;
}

/**
 * 쿠폰이 적용된 최종 결제 금액을 계산합니다.
 */
export const calculateFinalTotal = (
  coupons: Coupon[],
  cartItems: CartItem[],
  isIsland: boolean = false
): FinalCalculationResult => {
  // 1. 주문 총액
  const orderTotal = calculateOrderTotal(cartItems);

  // 2. 각 쿠폰별 할인 효과 계산
  const appliedCoupons = coupons.map((coupon) => {
    const discountResult = calculateCouponDiscount(
      coupon,
      cartItems,
      orderTotal,
      isIsland
    );

    return {
      coupon,
      discountItem: discountResult.itemDiscount,
      discountShipping: discountResult.shippingDiscount,
    };
  });

  // 3. 총 할인액 계산
  const itemDiscount = appliedCoupons.reduce(
    (sum, applied) => sum + applied.discountItem,
    0
  );
  const shippingDiscount = appliedCoupons.reduce(
    (sum, applied) => sum + applied.discountShipping,
    0
  );

  // 4. 최종 배송비 및 결제액 계산
  const baseShipping = getBaseShipping(orderTotal, isIsland);
  const shippingFee = Math.max(0, baseShipping - shippingDiscount);
  const discountTotal = itemDiscount + shippingDiscount;
  const finalTotal = orderTotal + shippingFee - itemDiscount;

  return {
    orderTotal,
    shippingFee,
    discountTotal,
    finalTotal,
    appliedCoupons,
  };
};
