import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { getIsCouponDisabled } from "./getCouponDisabled";

export const getAvailableCoupons = (
  couponList: Coupon[],
  orderList: CartItemType[]
) => {
  return couponList.filter((coupon) => !getIsCouponDisabled(coupon, orderList));
};
