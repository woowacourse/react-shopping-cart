import { PercentageDiscountCoupon } from "../../../type/Coupons";

export const calculatePercentageDiscountCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: PercentageDiscountCoupon;
}) => {
  const { discount } = coupon;
  const discountedPrice = totalPrice * (1 - discount / 100);

  return discountedPrice < 0 ? 0 : discountedPrice;
};
