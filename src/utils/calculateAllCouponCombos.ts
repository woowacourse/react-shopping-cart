import CartItem from "../types/CartItem";
import type { Coupon } from "../types/Coupon";

export function calculateAllCouponCombos({
  coupons,
  cartItemList,
  orderAmount,
  isIslandArea,
}: {
  coupons: Coupon[];
  cartItemList: CartItem[];
  orderAmount: number;
  isIslandArea: boolean;
}): {
  combo: string[];
  discount: number;
}[] {
  return getAllCouponCombos(coupons).map((combo) => {
    const discount = combo.reduce((total, coupon) => {
      switch (coupon.discountType.toLowerCase()) {
        case "fixed":
          return total + calcFixedDiscount(coupon, orderAmount);
        case "buyxgety":
          return total + calcBuyXGetYDiscount(cartItemList);
        case "freeshipping":
          return total + calcFreeShipping(coupon, orderAmount, isIslandArea);
        case "percentage":
          return total + calcPercentageDiscount(coupon, orderAmount);
        default:
          console.warn("Unrecognized coupon type:", coupon.discountType);
          return total;
      }
    }, 0);

    return {
      combo: combo.map((c) => c.code),
      discount,
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
  let shippingCost;
  shippingCost = isIslandArea ? 6000 : 3000;

  if (orderAmount >= 100000) {
    shippingCost -= 3000;
  }

  return "minimumAmount" in coupon && orderAmount >= coupon.minimumAmount
    ? shippingCost
    : 0;
}

function calcPercentageDiscount(coupon: Coupon, orderAmount: number): number {
  return "discount" in coupon
    ? Math.floor(orderAmount * (coupon.discount / 100))
    : 0;
}

function getAllCouponCombos(coupons: Coupon[]): Coupon[][] {
  return coupons
    .flatMap((c1, i) => coupons.slice(i + 1).map((c2) => [c1, c2]))
    .concat(coupons.map((c) => [c]));
}
