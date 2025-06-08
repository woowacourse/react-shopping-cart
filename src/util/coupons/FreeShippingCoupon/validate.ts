import { FreeShippingCoupon } from "../../../type/Coupons";
import { validateExpirationDate } from "../validateCoupons";

export const validateFreeShippingCoupon = ({
  totalPrice,
  coupon,
}: {
  totalPrice: number;
  coupon: FreeShippingCoupon;
}) => {
  const { minimumAmount, expirationDate } = coupon;

  return totalPrice >= minimumAmount && validateExpirationDate(expirationDate);
};
