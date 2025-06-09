import { CartItem } from "@/type/CartItem";
import { Coupon } from "@/type/Coupon";
import { getBaseShipping } from "./getBaseShipping";
import { seekMostExpensiveBOGOItem } from "./seekMostExpensiveBOGOItem";

export interface CouponDiscountResult {
  itemDiscount: number;
  shippingDiscount: number;
  totalDiscount: number;
}

/**
 * 개별 쿠폰의 할인 효과를 계산합니다.
 */
export const calculateCouponDiscount = (
  coupon: Coupon,
  cartItems: CartItem[],
  orderTotal: number,
  isIsland: boolean = false
): CouponDiscountResult => {
  let itemDiscount = 0;
  let shippingDiscount = 0;

  const baseShipping = getBaseShipping(orderTotal, isIsland);

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
          cartItems,
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
    itemDiscount,
    shippingDiscount,
    totalDiscount: itemDiscount + shippingDiscount,
  };
};
