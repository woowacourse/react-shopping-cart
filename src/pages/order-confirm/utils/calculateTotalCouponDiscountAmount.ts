import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { calculateCouponDiscountAmount } from "./calculateCouponDiscountAmount";

type CalculateTotalCouponDiscountAmount = {
  couponList: Coupon[];
  orderList: CartItemType[];
  deliveryPrice: number;
};

export const calculateTotalCouponDiscountAmount = ({
  couponList,
  orderList,
  deliveryPrice,
}: CalculateTotalCouponDiscountAmount) => {
  return couponList.reduce(
    (total, coupon) =>
      total +
      calculateCouponDiscountAmount({ coupon, orderList, deliveryPrice }),
    0
  );
};
