import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { getAvailableCoupons } from "./getAvailableCoupons";
import { calculateBestCoupons } from "./calculateBestCoupons";

type GetBestCouponCombinationParams = {
  couponList: Coupon[];
  orderList: CartItemType[];
  couponCount: number;
  deliveryPrice: number;
};

export const getBestCouponCombination = ({
  couponList,
  orderList,
  couponCount,
  deliveryPrice,
}: GetBestCouponCombinationParams) => {
  const availableCoupons = getAvailableCoupons(couponList, orderList);
  return calculateBestCoupons({
    couponList: availableCoupons,
    orderList,
    couponCount,
    deliveryPrice,
  });
};
