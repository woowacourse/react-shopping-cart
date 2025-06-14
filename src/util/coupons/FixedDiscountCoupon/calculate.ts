import { FixedDiscountCoupon } from "../../../type/Coupons";

export const calculateFixedDiscountCoupon = ({
  coupon,
}: {
  coupon: FixedDiscountCoupon;
}) => {
  const { discount } = coupon;

  return discount;
};
