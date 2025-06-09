import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import {
  calculateOrderTotal,
  partitionCoupons,
  selectOptimalCoupons,
  calculateFinalTotal,
} from "@/util/coupon";

export interface CouponApplyResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
  appliedCoupons: Coupon[];
}

interface Props {
  coupons?: Coupon[];
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean;
}

const useBestCouponCombo = ({
  coupons = [],
  selectedShoppingCartItems,
  isIsland = false,
}: Props): CouponApplyResult => {
  /* 1. 주문 총액 계산 - selectedShoppingCartItems에만 의존 */
  const orderTotal = useMemo(() => {
    return calculateOrderTotal(selectedShoppingCartItems);
  }, [selectedShoppingCartItems]);

  /* 2. 유효한 쿠폰 필터링 - coupons와 selectedShoppingCartItems에 의존 */
  const validCoupons = useMemo(() => {
    const partitionResult = partitionCoupons(
      coupons,
      selectedShoppingCartItems
    );
    return partitionResult.validCoupons;
  }, [coupons, selectedShoppingCartItems]);

  /* 3. 최적 쿠폰 조합 선택 - validCoupons, selectedShoppingCartItems, orderTotal, isIsland에 의존 */
  const bestCoupons = useMemo(() => {
    return selectOptimalCoupons(
      Array.from(validCoupons),
      selectedShoppingCartItems,
      orderTotal,
      isIsland
    );
  }, [validCoupons, selectedShoppingCartItems, orderTotal, isIsland]);

  /* 4. 최종 계산 - bestCoupons, selectedShoppingCartItems, isIsland에 의존 */
  const calculationResult = useMemo(() => {
    return calculateFinalTotal(
      bestCoupons,
      selectedShoppingCartItems,
      isIsland
    );
  }, [bestCoupons, selectedShoppingCartItems, isIsland]);

  return {
    orderTotal: calculationResult.orderTotal,
    shippingFee: calculationResult.shippingFee,
    discountTotal: calculationResult.discountTotal,
    finalTotal: calculationResult.finalTotal,
    appliedCoupons: bestCoupons,
  };
};

export { useBestCouponCombo };
