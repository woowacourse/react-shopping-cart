import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { partitionCoupons } from "@/util/coupon/partitionCoupons";
import { useCouponCalculation } from "./useCouponCalculation";
import { getBaseShipping } from "@/util/coupon/getBaseShipping";

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
  isIsland?: boolean; // 제주·도서산간 여부 (추가 배송비 3,000원)
}

const useBestCouponCombo = ({
  coupons = [],
  selectedShoppingCartItems,
  isIsland = false,
}: Props): CouponApplyResult => {
  /* 1. 주문 총액 */
  const orderTotal = useMemo(
    () =>
      selectedShoppingCartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [selectedShoppingCartItems]
  );

  /* 2. 쿠폰 유효성 필터링 */
  const { validCoupons } = useMemo(
    () => partitionCoupons(coupons, selectedShoppingCartItems),
    [coupons, selectedShoppingCartItems]
  );

  /* 3. 개별 쿠폰 할인 효과 계산 및 정렬 */
  const bestCoupons = useMemo(() => {
    const baseShipping = getBaseShipping(orderTotal, isIsland);

    // 각 쿠폰의 할인 효과를 개별적으로 계산
    const couponWithDiscount = Array.from(validCoupons).map((coupon) => {
      let itemDiscount = 0,
        shippingDiscount = 0;

      switch (coupon.discountType) {
        case "fixed":
          itemDiscount = coupon.discount ?? 0;
          break;
        case "freeShipping":
          shippingDiscount = baseShipping;
          break;
        case "percentage":
          itemDiscount = (orderTotal * (coupon.discount ?? 0)) / 100;
          break;
        case "buyXgetY": {
          const buyQty = coupon.buyQuantity ?? 0;
          const getQty = coupon.getQuantity ?? 0;

          if (buyQty > 0 && getQty > 0) {
            // 가장 비싼 아이템 중 buyQty 이상인 것 찾기
            const eligibleItems = selectedShoppingCartItems.filter(
              (item) => item.quantity >= buyQty
            );

            if (eligibleItems.length > 0) {
              const maxPriceItem = eligibleItems.reduce((prev, curr) =>
                curr.product.price > prev.product.price ? curr : prev
              );

              const groupSize = buyQty + getQty;
              const freeCount =
                Math.floor(maxPriceItem.quantity / groupSize) * getQty;
              itemDiscount = maxPriceItem.product.price * freeCount;
            }
          }
          break;
        }
        default:
          console.warn(`알 수 없는 쿠폰 타입: ${coupon.discountType}`);
          break;
      }

      return {
        coupon,
        totalDiscount: itemDiscount + shippingDiscount,
      };
    });

    // 할인 효과가 큰 순으로 정렬하고 상위 2개 선택
    return couponWithDiscount
      .sort((a, b) => b.totalDiscount - a.totalDiscount)
      .slice(0, 2)
      .map((item) => item.coupon);
  }, [validCoupons, orderTotal, selectedShoppingCartItems, isIsland]);

  /* 4. 선택된 쿠폰들로 최종 계산 */
  const calculationResult = useCouponCalculation({
    coupons: bestCoupons,
    selectedShoppingCartItems,
    isIsland,
  });

  return useMemo(
    () => ({
      orderTotal: calculationResult.orderTotal,
      shippingFee: calculationResult.shippingFee,
      discountTotal: calculationResult.discountTotal,
      finalTotal: calculationResult.finalTotal,
      appliedCoupons: bestCoupons,
    }),
    [calculationResult, bestCoupons]
  );
};

export { useBestCouponCombo };
