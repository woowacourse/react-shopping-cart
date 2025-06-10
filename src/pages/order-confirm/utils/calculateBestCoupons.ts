import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { calculateCouponDiscountAmount } from "./calculateCouponDiscountAmount";

type CalculateBestCouponsParams = {
  couponList: Coupon[];
  orderList: CartItemType[];
  couponCount: number;
  deliveryPrice: number;
};

export const calculateBestCoupons = ({
  couponList,
  orderList,
  couponCount,
  deliveryPrice,
}: CalculateBestCouponsParams) => {
  const bestCombo = couponList
    .map((coupon) => ({
      ...coupon,
      discountAmount: calculateCouponDiscountAmount({
        coupon,
        orderList,
        deliveryPrice,
      }),
    }))
    .sort((a, b) => b.discountAmount - a.discountAmount)
    .slice(0, couponCount);

  return bestCombo;
};
