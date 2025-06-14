import { PercentageDiscountCoupon } from "../../../type/Coupons";

export const calculatePercentageDiscountCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: PercentageDiscountCoupon;
}) => {
  const { discount } = coupon;

  return totalPrice * (discount / 100);
};
