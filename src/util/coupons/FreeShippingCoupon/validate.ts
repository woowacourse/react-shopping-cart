import { FreeShippingCoupon } from "../../../type/Coupons";

export const validateFreeShippingCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: FreeShippingCoupon;
}) => {
  const { minimumAmount } = coupon;

  return totalPrice >= minimumAmount;
};
