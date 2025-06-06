import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { partitionCoupons } from "@/util/coupon/partitionCoupons";
import { useCouponCalculation } from "./useCouponCalculation";
import { getBaseShipping } from "@/util/coupon/getBaseShipping";
import { seekMostExpensiveBOGOItem } from "@/util/coupon/seekMostExpensiveBOGOItem";

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
          const buyQuantity = coupon.buyQuantity ?? 0;
          const getQuantity = coupon.getQuantity ?? 0;

          if (buyQuantity > 0 && getQuantity > 0) {
            const result = seekMostExpensiveBOGOItem(
              selectedShoppingCartItems,
              buyQuantity,
              getQuantity
            );

            if (result) {
              itemDiscount = result.totalDiscount;
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

    // 할인 효과 기준 내림차순 정렬 후 상위 2개 선택
    // 참고: 현재는 그리디 방식으로 최대 2개 쿠폰 조합을 선택하며,
    // 이는 대부분의 실제 사용 사례에서 충분한 성능과 정확도를 제공합니다.
    // 더 정확한 결과가 필요한 경우 모든 쿠폰 조합을 탐색하는 방식으로 확장 가능합니다.
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
