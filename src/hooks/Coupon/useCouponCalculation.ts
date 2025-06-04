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

interface Props {
  coupons: Coupon[];
  selectedShoppingCartItems: CartItem[];
  isIsland?: boolean; // 제주·도서산간 여부 (추가 배송비 3,000원)
}

const useCouponCalculation = ({
  coupons,
  selectedShoppingCartItems,
  isIsland = false,
}: Props): CouponCalculationResult => {
  /* 1. 주문 총액 */
  const orderTotal = useMemo(
    () =>
      selectedShoppingCartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [selectedShoppingCartItems]
  );

  /* 2. BOGO 쿠폰을 위한 가장 비싼 아이템 찾기 */
  const seekMostExpensiveBOGOItem = useCallback(
    (buyQty: number): CartItem | null => {
      // buyQty 이상인 아이템만 필터링
      const eligibleItems = selectedShoppingCartItems.filter(
        (item) => item.quantity >= buyQty
      );

      if (eligibleItems.length === 0) {
        return null;
      }

      return eligibleItems.reduce((prev, curr) =>
        curr.product.price > prev.product.price ? curr : prev
      );
    },
    [selectedShoppingCartItems]
  );

  /* 3. 쿠폰별 할인 계산 */
  const appliedCoupons = useMemo(() => {
    const baseShipping = getBaseShipping(orderTotal, isIsland);

    return coupons.map((coupon) => {
      let item = 0,
        shippingFee = 0;

      switch (coupon.discountType) {
        case "fixed":
          item = coupon.discount ?? 0;
          break;

        case "freeShipping":
          shippingFee = baseShipping;
          break;

        case "percentage":
          item = (orderTotal * (coupon.discount ?? 0)) / 100;
          break;

        case "buyXgetY": {
          const buyQty = coupon.buyQuantity ?? 0;
          const getQty = coupon.getQuantity ?? 0;
          if (buyQty <= 0 || getQty <= 0) {
            item = 0;
            break;
          }

          const maxItem = seekMostExpensiveBOGOItem(buyQty);
          if (!maxItem) {
            item = 0;
            break;
          }

          const groupSize = buyQty + getQty;
          const freeCount = Math.floor(maxItem.quantity / groupSize) * getQty;
          item = maxItem.product.price * freeCount;
          console.log(
            `BOGO 할인 적용: ${maxItem.product.name} - ${freeCount}개 무료`
          );
          break;
        }

        default:
          console.warn(`Unknown coupon type: ${coupon.discountType}`);
          break;
      }

      return {
        coupon,
        discountItem: item,
        discountShipping: shippingFee,
      };
    });
  }, [coupons, orderTotal, isIsland, seekMostExpensiveBOGOItem]);

  /* 4. 할인 합계와 배송비 계산 */
  const { itemDiscount, shipDiscount } = useMemo(() => {
    let itemDiscount = 0,
      shipDiscount = 0;
    appliedCoupons.forEach((coupon) => {
      itemDiscount += coupon.discountItem;
      shipDiscount += coupon.discountShipping;
    });
    return { itemDiscount, shipDiscount };
  }, [appliedCoupons]);

  const baseShipping = getBaseShipping(orderTotal, isIsland);
  const shippingFee = Math.max(0, baseShipping - shipDiscount);

  /* 5. 최종 금액 */
  const discountTotal = itemDiscount + shipDiscount;
  const finalTotal = orderTotal + shippingFee - itemDiscount;

  return {
    orderTotal,
    shippingFee,
    discountTotal,
    finalTotal,
    appliedCoupons,
  };
};

export { useCouponCalculation };
