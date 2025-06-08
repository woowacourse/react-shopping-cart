import { Coupon, CouponType } from "../../type/Coupons";
import { validateFixedDiscountCoupon } from "./FixedDiscountCoupon/validate";
import { validateBuyXGetYCoupon } from "./BuyXGetYCoupon/validate";
import { validateFreeShippingCoupon } from "./FreeShippingCoupon/validate";
import { validatePercentageDiscountCoupon } from "./PercentageDiscountCoupon/validate";
import { CartItem } from "../../type/CartItem";
import { calculateTotalPrice } from "../cart/calculateTotalPrice";

export const validateExpirationDate = (expirationDate: string): boolean => {
  const today = new Date();
  const expiration = new Date(`${expirationDate}T23:59:59`);
  return expiration >= today;
};

export const validateCoupons = ({
  cartItems,
  coupon,
}: {
  cartItems: CartItem[];
  coupon: Coupon;
}) => {
  const totalPrice = calculateTotalPrice(cartItems);

  switch (coupon.discountType) {
    case CouponType.FIXED: {
      return validateFixedDiscountCoupon({
        totalPrice,
        coupon,
      });
    }
    case CouponType.FREE_SHIPPING: {
      return validateFreeShippingCoupon({
        totalPrice,
        coupon,
      });
    }
    case CouponType.PERCENTAGE: {
      return validatePercentageDiscountCoupon({
        coupon,
      });
    }
    case CouponType.BUY_X_GET_Y: {
      return validateBuyXGetYCoupon({
        coupon,
        cartItems,
      });
    }
    default:
      return false;
  }
};
