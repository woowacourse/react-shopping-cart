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
  const selectedCouponObjects = coupons.filter((c) =>
    selectedCoupons.has(c.id)
  );

  const selectedCombos = calculateAllCouponCombos({
    coupons: selectedCouponObjects,
    cartItemList,
    orderAmount,
    isIslandArea,
  });

  const selectedCombo = selectedCombos.find((c) => c.isValid);

  return selectedCombo?.discount ?? 0;
}
