import { Coupon } from "../../../api/coupon";
import { Cart } from "../../../api/cart";
import { isCouponAvailable } from "./couponValidation";

export const getAvailableCoupons = (
  coupons: Coupon[],
  totalCartPrice: number,
  selectedCartItems: Cart[] | undefined
): Coupon[] => {
  return coupons.filter((coupon) =>
    isCouponAvailable(coupon, totalCartPrice, selectedCartItems)
  );
};
