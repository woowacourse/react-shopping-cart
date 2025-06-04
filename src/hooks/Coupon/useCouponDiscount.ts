import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { useCouponCalculation } from "./useCouponCalculation";

export interface CouponDiscountResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
}

interface Props {
  selectedCoupons: Coupon[] | undefined; // 선택된 쿠폰들
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean; // 제주·도서산간 여부 (추가 배송비 3,000원)
}

const useCouponDiscount = ({
  selectedCoupons = [],
  selectedShoppingCartItems,
  isIsland = false,
}: Props): CouponDiscountResult => {
  // 공통 계산 로직을 useCouponCalculation에 위임
  const calculationResult = useCouponCalculation({
    coupons: selectedCoupons,
    selectedShoppingCartItems,
    isIsland,
  });

  // 기존 인터페이스 유지를 위해 appliedCoupons를 제외하고 반환
  return useMemo(
    () => ({
      orderTotal: calculationResult.orderTotal,
      shippingFee: calculationResult.shippingFee,
      discountTotal: calculationResult.discountTotal,
      finalTotal: calculationResult.finalTotal,
    }),
    [calculationResult]
  );
};

export { useCouponDiscount };
