import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { getCouponDiscountAmount } from "./getCouponDiscountAmount";

type GetTotalCouponDiscountAmount = {
  couponList: Coupon[];
  orderList: CartItemType[];
  deliveryPrice: number;
};

export const getTotalCouponDiscountAmount = ({
  couponList,
  orderList,
  deliveryPrice,
}: GetTotalCouponDiscountAmount) => {
  return couponList.reduce(
    (total, coupon) =>
      total + getCouponDiscountAmount({ coupon, orderList, deliveryPrice }),
    0
  );
};
