import { CartItemTypes } from "../../shopping-cart/types/cartItem";
import {
  validateDate,
  validateMinimumAmount,
  validateTime,
} from "../hooks/utils/validateCoupons";
import { CouponCode, CouponCodes, CouponType } from "../types/coupon";

export const getCouponStatus = ({
  orderPrice,
  twoPlusOneApplicableItems,
  coupons,
}: {
  orderPrice: number;
  twoPlusOneApplicableItems: CartItemTypes[];
  coupons: CouponType[];
}): Record<CouponCode, boolean> => {
  return Object.values(CouponCodes).reduce((acc, code) => {
    return {
      ...acc,
      [code]: validateCoupon(
        code,
        orderPrice,
        twoPlusOneApplicableItems,
        coupons
      ),
    };
  }, {} as Record<CouponCode, boolean>);
};

const validateCoupon = (
  couponCode: CouponCode,
  orderPrice: number,
  selectedCartItems: CartItemTypes[],
  coupons: CouponType[]
) => {
  const today = new Date();
  const couponItem = coupons.find((item) => item.code === couponCode);
  if (!couponItem) return false;

  if (couponItem.code === "BOGO" && selectedCartItems.length === 0)
    return false;

  return (
    validateDate({ expirationDate: couponItem.expirationDate, today }) &&
    (!couponItem.availableTime ||
      validateTime({ availableTime: couponItem.availableTime, today })) &&
    (!couponItem.minimumAmount ||
      validateMinimumAmount({
        minimumAmount: couponItem.minimumAmount,
        orderPrice,
      }))
  );
};
