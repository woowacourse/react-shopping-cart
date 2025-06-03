import { useCallback, useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { getBaseShipping } from "@/util/coupon/getBaseShipping";

export interface CouponApplied {
  coupon: Coupon;
  discountItem: number;
  discountShipping: number;
}

export interface CouponCalculationResult {
  orderTotal: number;
  shippingFee: number;
  discountTotal: number;
  finalTotal: number;
  appliedCoupons: CouponApplied[];
}

interface UseCouponCalculationProps {
  selectedCoupons: Coupon[];
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean;
}

export const useCouponCalculation = ({
  selectedCoupons = [],
  selectedShoppingCartItems,
  isIsland = false,
}: UseCouponCalculationProps): CouponCalculationResult => {
  // 주문 총액
  const orderTotal = useMemo(() => {
    if (!selectedShoppingCartItems || selectedShoppingCartItems.length === 0) {
      return 0;
    }

    return selectedShoppingCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }, [selectedShoppingCartItems]);
  // 가장 비싼 BOGO 아이템 찾기

  const seekMostExpensiveBOGOItem = useCallback(
    (buyQty: number): CartItem | null => {
      // 쇼핑카트가 비어있으면 null 반환
      if (
        !selectedShoppingCartItems ||
        selectedShoppingCartItems.length === 0
      ) {
        return null;
      }

      // buyQty 이상인 아이템만 필터링
      const eligibleItems = selectedShoppingCartItems.filter(
        (item) => item.quantity >= buyQty
      );

      // 조건을 만족하는 아이템이 없으면 null 반환
      if (eligibleItems.length === 0) {
        return null;
      }

      // 가격 비교를 통해 가장 비싼 아이템 객체를 반환
      return eligibleItems.reduce((prev, curr) =>
        curr.product.price > prev.product.price ? curr : prev
      );
    },
    [selectedShoppingCartItems]
  );
  // 쿠폰별 할인 계산
  const appliedCoupons = useMemo(() => {
    const baseShipping = getBaseShipping(orderTotal, isIsland);

    return selectedCoupons.map((coupon) => {
      let discountItem = 0;
      let discountShipping = 0;

      switch (coupon.discountType) {
        case "fixed":
          discountItem = coupon.discount ?? 0;
          break;
        case "freeShipping":
          discountShipping = baseShipping;
          break;
        case "percentage":
          discountItem = (orderTotal * (coupon.discount ?? 0)) / 100;
          break;
        case "buyXgetY": {
          const maxItem = seekMostExpensiveBOGOItem(coupon.buyQuantity ?? 0);
          if (maxItem) {
            const freeCount =
              Math.floor(maxItem.quantity / (coupon.buyQuantity ?? 0)) *
              (coupon.getQuantity ?? 0);
            discountItem = maxItem.product.price * freeCount;
          }

          break;
        }
        default:
          console.warn(`Unknown coupon type: ${coupon.discountType}`);
          break;
      }

      return { coupon, discountItem, discountShipping };
    });
  }, [selectedCoupons, orderTotal, isIsland, seekMostExpensiveBOGOItem]);

  // 총 할인 계산
  const { totalItemDiscount, totalShippingDiscount } = useMemo(() => {
    let totalItemDiscount = 0;
    let totalShippingDiscount = 0;

    appliedCoupons.forEach((applied) => {
      totalItemDiscount += applied.discountItem;
      totalShippingDiscount += applied.discountShipping;
    });

    return { totalItemDiscount, totalShippingDiscount };
  }, [appliedCoupons]);

  // 최종 계산
  const baseShipping = getBaseShipping(orderTotal, isIsland);
  const shippingFee = Math.max(0, baseShipping - totalShippingDiscount);
  const discountTotal = totalItemDiscount + totalShippingDiscount;
  const finalTotal = orderTotal + shippingFee - totalItemDiscount;

  return {
    orderTotal,
    shippingFee,
    discountTotal,
    finalTotal,
    appliedCoupons,
  };
};
