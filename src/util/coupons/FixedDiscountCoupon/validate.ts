import { FixedDiscountCoupon } from "../../../type/Coupons";
import { validateExpirationDate } from "../validateCoupons";

export const validateFixedDiscountCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: FixedDiscountCoupon;
}) => {
  const { minimumAmount, expirationDate } = coupon;

  return totalPrice >= minimumAmount && validateExpirationDate(expirationDate);
};
