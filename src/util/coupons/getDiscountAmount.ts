import { CartItem } from "../../type/CartItem";
import { Coupon, CouponType } from "../../type/Coupons";
import { calculateBuyXGetYCoupon } from "./BuyXGetYCoupon/calculate";
import { calculateFixedDiscountCoupon } from "./FixedDiscountCoupon/calculate";
import { calculateFreeShippingCoupon } from "./FreeShippingCoupon/calculate";
import { calculatePercentageDiscountCoupon } from "./PercentageDiscountCoupon/calculate";

export const getDiscountAmount = ({
  coupon,
  totalPrice,
  cartItems,
  hasDefaultShipping,
  hasRemoteAreaShipping,
}: {
  coupon: Coupon;
  totalPrice: number;
  cartItems: CartItem[];
  hasDefaultShipping: boolean;
  hasRemoteAreaShipping: boolean;
}) => {
  switch (coupon.discountType) {
    case CouponType.FIXED:
      return calculateFixedDiscountCoupon({ coupon });
    case CouponType.FREE_SHIPPING:
      return calculateFreeShippingCoupon({
        hasDefaultShipping,
        hasRemoteAreaShipping,
      });
    case CouponType.PERCENTAGE:
      return calculatePercentageDiscountCoupon({ totalPrice, coupon });
    case CouponType.BUY_X_GET_Y:
      return calculateBuyXGetYCoupon({ coupon, cartItems });
    default:
      return 0;
  }
};
