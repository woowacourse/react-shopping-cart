import { FixedDiscountCoupon } from "../../../type/Coupons";

export const calculateFixedDiscountCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: FixedDiscountCoupon;
}) => {
  const { discount } = coupon;
  const discountedPrice = totalPrice - discount;

  return discountedPrice < 0 ? 0 : discountedPrice;
};
