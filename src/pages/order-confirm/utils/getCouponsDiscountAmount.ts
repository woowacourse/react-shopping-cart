import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { Coupon } from "@/apis/coupon/coupon.type";
import { calculateTotalCouponDiscountAmount } from "./calculateTotalCouponDiscountAmount";

type GetCouponsDiscountAmount = {
  couponList: Coupon[];
  orderList: CartItemType[];
  deliveryPrice: number;
  getIsSelectedId: (id: number) => boolean;
};

export const getCouponsDiscountAmount = ({
  couponList,
  orderList,
  deliveryPrice,
  getIsSelectedId,
}: GetCouponsDiscountAmount) => {
  const selectedCoupons = couponList.filter(({ id }) => getIsSelectedId(id));
  const discountAmount = calculateTotalCouponDiscountAmount({
    couponList: selectedCoupons,
    orderList,
    deliveryPrice,
  });
  return discountAmount;
};
