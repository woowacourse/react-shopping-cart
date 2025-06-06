import { useMemo } from "react";
import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { getBaseShipping } from "@/util/coupon/getBaseShipping";
import { seekMostExpensiveBOGOItem } from "@/util/coupon/seekMostExpensiveBOGOItem";

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
  isIsland: boolean;
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
          const buyQuantity = coupon.buyQuantity ?? 0;
          const getQuantity = coupon.getQuantity ?? 0;
          if (buyQuantity <= 0 || getQuantity <= 0) {
            item = 0;
            break;
          }

          const result = seekMostExpensiveBOGOItem(
            selectedShoppingCartItems,
            buyQuantity,
            getQuantity
          );

          if (result) {
            item = result.totalDiscount;
          }
          break;
        }

        // 사실상 도달하는게 불가하나,(never)
        // sentry 같은걸로 처리 할수는 있겠죠.
        default:
          console.warn(
            `알수없는 쿠폰 유형: ${coupon.discountType}! 쿠폰을 무시합니다.`
          );
          break;
      }

      return {
        coupon,
        discountItem: item,
        discountShipping: shippingFee,
      };
    });
  }, [coupons, orderTotal, isIsland, selectedShoppingCartItems]);

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
