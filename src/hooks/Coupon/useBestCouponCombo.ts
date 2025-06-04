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
        let itemDiscount = 0,
          shippingFeeDiscount = 0;
        switch (coupon.discountType) {
          case "fixed":
            itemDiscount = coupon.discount ?? 0;
            break;
          case "freeShipping":
            shippingFeeDiscount = baseShipping;
            break;
          case "percentage":
            itemDiscount = (orderTotal * (coupon.discount ?? 0)) / 100;
            break;
          case "buyXgetY": {
            const maxPrice = seekMostExpensiveBOGOItem(coupon.buyQuantity ?? 0);

            if (maxPrice) itemDiscount = maxPrice * (coupon.getQuantity ?? 0);
            break;
          }
          default:
            // 잘못된 쿠폰 타입 처리
            console.warn(`알수없는 쿠폰 타입: ${coupon.discountType}`);
            break;
        }
        return {
          coupon: coupon,
          discountItem: itemDiscount,
          discountShipping: shippingFeeDiscount,
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
  const { itemDiscount, shippingDiscount } = useMemo(() => {
    let itemDiscount = 0,
      shippingDiscount = 0;
    applyingCoupons.forEach((coupon) => {
      itemDiscount += coupon.discountItem;
      shippingDiscount += coupon.discountShipping;
    });
    return { itemDiscount, shippingDiscount };
  }, [applyingCoupons]);

  const appliedCoupons = applyingCoupons.map((coupon) => coupon.coupon);
  const baseShipping = getBaseShipping(orderTotal, isIsland);
  const shippingFee = Math.max(0, baseShipping - shippingDiscount);

  /* 6. 최종 금액 */
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
export { useBestCouponCombo };
