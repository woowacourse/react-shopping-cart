import { useMemo } from "react";
import { Cart } from "../../../api/cart";
import { Coupon } from "../../../api/coupon";
import {
  FREE_SHIPPING_STANDARD,
  ISLAND_SHIPPING_FEE,
  SHIPPING_FEE,
} from "./OrderConstants";
import { calculateCouponDiscount } from "../../coupon/utils/couponCalculator";

export function useOrderCalculation(
  selectedCartItems: Cart[],
  isIsland?: boolean,
  selectedCoupons: Coupon[] = []
) {
  return useMemo(() => {
    // 1. 장바구니 기본 정보 계산
    const typeCount = selectedCartItems.length;
    const totalCount = selectedCartItems.reduce(
      (acc, cart) => acc + cart.quantity,
      0
    );
    const totalCartPrice = selectedCartItems.reduce(
      (acc, cart) => acc + cart.product.price * cart.quantity,
      0
    );

    // 2. 배송비 계산
    const baseShippingFee =
      totalCartPrice >= FREE_SHIPPING_STANDARD || totalCartPrice === 0
        ? 0
        : SHIPPING_FEE;
    const initialShippingFee =
      baseShippingFee + (isIsland ? ISLAND_SHIPPING_FEE : 0);

    // 3. 쿠폰 할인 계산 (전략 패턴 적용)
    const { finalShippingFee, finalDiscount } = calculateCouponDiscount(
      selectedCoupons,
      totalCartPrice,
      initialShippingFee,
      selectedCartItems
    );

    const totalPrice = totalCartPrice + finalShippingFee - finalDiscount;

    return {
      typeCount,
      totalCount,
      totalCartPrice,
      shippingFee: finalShippingFee,
      totalPrice,
      finalDiscount,
    };
  }, [selectedCartItems, isIsland, selectedCoupons]);
}
