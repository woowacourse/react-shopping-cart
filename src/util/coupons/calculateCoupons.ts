import { CartItem } from "../../type/CartItem";
import { Coupon, CouponType } from "../../type/Coupons";
import { calculateShippingFee } from "../cart/calculateShippingFee";
import { calculateTotalPrice } from "../cart/calculateTotalPrice";
import { calculateBuyXGetYCoupon } from "./BuyXGetYCoupon/calculate";
import { calculateFixedDiscountCoupon } from "./FixedDiscountCoupon/calculate";
import { calculateFreeShippingCoupon } from "./FreeShippingCoupon/calculate";
import { getCouponCombos } from "./getCouponCombos";
import { calculatePercentageDiscountCoupon } from "./PercentageDiscountCoupon/calculate";

const getDiscountAmount = ({
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

export const calculateCoupons = ({
  cartItems,
  coupons,
  hasRemoteAreaShipping,
}: {
  cartItems: CartItem[];
  coupons: Coupon[];
  hasRemoteAreaShipping: boolean;
}) => {
  const couponCombos = getCouponCombos(coupons);
  const initialTotalPrice = calculateTotalPrice(cartItems);
  const hasDefaultShipping = calculateShippingFee(initialTotalPrice) !== 0;

  const getTotalDiscountForCombo = (combo: Coupon[]) => {
    return combo.reduce(
      ({ totalPrice, totalDiscount }, coupon) => {
        const discount = getDiscountAmount({
          coupon,
          totalPrice,
          cartItems,
          hasDefaultShipping,
          hasRemoteAreaShipping,
        });
        return {
          totalPrice: totalPrice - discount,
          totalDiscount: totalDiscount + discount,
        };
      },
      {
        totalPrice: initialTotalPrice,
        totalDiscount: 0,
      }
    ).totalDiscount;
  };

  const maxDiscountedPrice = Math.max(
    ...couponCombos.map(getTotalDiscountForCombo)
  );

  return { maxDiscountedPrice };
};
