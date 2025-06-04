import { useCallback, useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { partitionCoupons } from "@/util/coupon/partitionCoupons";
import { getBaseShipping } from "@/util/coupon/getBaseShipping";

export interface CouponApplied {
  coupon: Coupon;
  discountItem: number; // 상품 가격에서 깎인 금액
  discountShipping: number; // 배송비에서 깎인 금액
}

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

const useCouponApply = ({
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

  /* 2. (쿠폰 유효성 필터링) */
  const { validCoupons } = useMemo(
    () => partitionCoupons(coupons, selectedShoppingCartItems),
    [coupons, selectedShoppingCartItems]
  );

  const seekMostExpensiveBOGOItem = useCallback(
    (buyQty: number) => {
      return (
        selectedShoppingCartItems
          .filter((item) => item.quantity >= buyQty)
          .reduce((max, item) => Math.max(max, item.product.price), 0) || 0
      );
    },
    [selectedShoppingCartItems]
  );

  /* 4. 쿠폰별 할인 계산 + 큰 할인순 정렬 */
  const applyingCoupons = useMemo(() => {
    const baseShipping = getBaseShipping(orderTotal, isIsland);

    const list = [...validCoupons]
      .map((coupon) => {
        let item = 0,
          shippingFee = 0;
        switch (coupon.discountType) {
          case "fixed":
            item = coupon.discount ?? 0;
            break;
          case "freeShipping":
            shippingFee = baseShipping; // 기본 배송비 전체를 할인
            break;
          case "percentage":
            item = (orderTotal * (coupon.discount ?? 0)) / 100;
            break;
          case "buyXgetY": {
            const maxPrice = seekMostExpensiveBOGOItem(coupon.buyQuantity ?? 0);

            if (maxPrice) item = maxPrice * (coupon.getQuantity ?? 0);
            break;
          }
          default:
            // 잘못된 쿠폰 타입 처리
            console.warn(`Unknown coupon type: ${coupon.discountType}`);
            break;
        }
        return {
          coupon: coupon,
          discountItem: item,
          discountShipping: shippingFee,
        };
      })
      .sort(
        (a, b) =>
          b.discountItem +
          b.discountShipping -
          (a.discountItem + a.discountShipping)
      );

    return list.slice(0, 2); // 그리디하게 가장 큰 할인 2개만 적용
  }, [validCoupons, orderTotal, isIsland, seekMostExpensiveBOGOItem]);

  /* 5. 할인 합계와 배송비 ― 분리해서 계산 */
  const { itemDisc, shipDisc } = useMemo(() => {
    let itemDisc = 0,
      shipDisc = 0;
    applyingCoupons.forEach((coupon) => {
      itemDisc += coupon.discountItem;
      shipDisc += coupon.discountShipping;
    });
    return { itemDisc, shipDisc };
  }, [applyingCoupons]);

  const appliedCoupons = applyingCoupons.map((coupon) => coupon.coupon);
  const baseShipping = getBaseShipping(orderTotal, isIsland);
  const shippingFee = Math.max(0, baseShipping - shipDisc);

  /* 6. 최종 금액 */
  const discountTotal = itemDisc + shipDisc;
  const finalTotal = orderTotal + shippingFee - itemDisc;

  return {
    orderTotal,
    shippingFee,
    discountTotal,
    finalTotal,
    appliedCoupons,
  };
};
export { useCouponApply };
