import {
  DEFAULT_SHIPPING_FEE,
  LAND_AREA_DEFAULT_SHIPPING_FEE,
} from "../constants/shipping";
import type CartItem from "../types/CartItem";
import type { Coupon } from "../types/Coupon";

import { isCouponValid } from "./isCouponValid";

export function calculateAllCouponCombos({
  coupons,
  cartItemList,
  orderAmount,
  isIslandArea,
  now = new Date(),
}: {
  coupons: Coupon[];
  cartItemList: CartItem[];
  orderAmount: number;
  isIslandArea: boolean;
  now?: Date;
}): {
  combo: string[];
  discount: number;
  isValid: boolean;
}[] {
  return getAllCouponCombos(coupons).map((combo) => {
    const isValid = combo.every((coupon) =>
      isCouponValid(coupon, orderAmount, now)
    );

    const discount = isValid
      ? combo.reduce((total, coupon) => {
          switch (coupon.discountType.toLowerCase()) {
            case "fixed":
              return total + calcFixedDiscount(coupon, orderAmount);
            case "buyxgety":
              return total + calcBuyXGetYDiscount(cartItemList);
            case "freeshipping":
              return (
                total + calcFreeShipping(coupon, orderAmount, isIslandArea)
              );
            case "percentage":
              return total + calcPercentageDiscount(coupon, orderAmount);
            default:
              console.warn("Unrecognized coupon type:", coupon.discountType);
              return total;
          }
        }, 0)
      : 0;

    return {
      combo: combo.map((c) => c.code),
      discount,
      isValid,
    };
  });
}

function calcBuyXGetYDiscount(cartItemList: CartItem[]): number {
  const candidates = cartItemList.filter((item) => item.quantity >= 3);
  if (candidates.length === 0) return 0;
  return candidates.reduce((max, item) => Math.max(max, item.product.price), 0);
}

function calcFixedDiscount(coupon: Coupon, orderAmount: number): number {
  return "discount" in coupon &&
    "minimumAmount" in coupon &&
    orderAmount >= coupon.minimumAmount
    ? coupon.discount
    : 0;
}

function calcFreeShipping(
  coupon: Coupon,
  orderAmount: number,
  isIslandArea: boolean
): number {
  const shippingCost = isIslandArea
    ? LAND_AREA_DEFAULT_SHIPPING_FEE
    : DEFAULT_SHIPPING_FEE;

  const policyFreeShipping = orderAmount >= 100000 ? 3000 : 0;

  return "minimumAmount" in coupon && orderAmount >= coupon.minimumAmount
    ? shippingCost - policyFreeShipping
    : 0;
}

function calcPercentageDiscount(coupon: Coupon, orderAmount: number): number {
  return "discount" in coupon
    ? Math.floor(orderAmount * (coupon.discount / 100))
    : 0;
}

function getAllCouponCombos(coupons: Coupon[]): Coupon[][] {
  const singleCombos = coupons.map((c) => [c]);

  const pairCombos = coupons.flatMap((c1) =>
    coupons.filter((c2) => c2 !== c1).map((c2) => [c1, c2])
  );

  return [...singleCombos, ...pairCombos];
}
