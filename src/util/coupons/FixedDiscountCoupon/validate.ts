import { FixedDiscountCoupon } from "../../../type/Coupons";

export const validateFixedDiscountCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: FixedDiscountCoupon;
}) => {
  const { minimumAmount } = coupon;

  return totalPrice >= minimumAmount;
};
