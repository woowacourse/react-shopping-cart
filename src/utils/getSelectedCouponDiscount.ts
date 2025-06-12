import CartItem from "../types/CartItem";
import { Coupon } from "../types/Coupon";

import { calculateAllCouponCombos } from "./calculateAllCouponCombos";

export function getSelectedCouponDiscount({
  coupons,
  selectedCoupons,
  cartItemList,
  orderAmount,
  isIslandArea,
}: {
  coupons: Coupon[];
  selectedCoupons: Map<number, boolean>;
  cartItemList: CartItem[];
  orderAmount: number;
  isIslandArea: boolean;
}): number {
  return coupons.reduce((totalDiscount, coupon) => {
    if (!selectedCoupons.get(coupon.id)) return totalDiscount;

    const discount =
      calculateAllCouponCombos({
        coupons: [coupon],
        cartItemList,
        orderAmount,
        isIslandArea,
      }).find((combo) => combo.isValid)?.discount ?? 0;

    return totalDiscount + discount;
  }, 0);
}
