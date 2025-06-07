import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { getCouponDiscountAmount } from "./getCouponDiscountAmount";

type GetBestCouponCombinationParams = {
  availableCoupons: Coupon[];
  orderList: CartItemType[];
  couponCount: number;
  deliveryPrice: number;
};

export const getBestCouponCombination = ({
  availableCoupons,
  orderList,
  couponCount,
  deliveryPrice,
}: GetBestCouponCombinationParams) => {
  const bestCombo = availableCoupons
    .map((coupon) => ({
      ...coupon,
      discountAmount: getCouponDiscountAmount({
        coupon,
        orderList,
        deliveryPrice,
      }),
    }))
    .sort((a, b) => b.discountAmount - a.discountAmount)
    .slice(0, couponCount);

  return bestCombo;
};
