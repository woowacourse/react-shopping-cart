import { FixedDiscountCoupon } from "../../../type/Coupons";

export const calculateFixedDiscountCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: FixedDiscountCoupon;
}) => {
  const { discount } = coupon;
  const discountAmount = totalPrice - discount;

  return discountAmount < 0 ? 0 : discountAmount;
};
