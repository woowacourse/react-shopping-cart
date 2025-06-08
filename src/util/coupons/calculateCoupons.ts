import { CartItem } from "../../type/CartItem";
import { Coupon, CouponType } from "../../type/Coupons";
import { calculateShippingFee } from "../cart/calculateShippingFee";
import { calculateTotalPrice } from "../cart/calculateTotalPrice";
import { calculateBuyXGetYCoupon } from "./BuyXGetYCoupon/calculate";
import { calculateFixedDiscountCoupon } from "./FixedDiscountCoupon/calculate";
import { calculateFreeShippingCoupon } from "./FreeShippingCoupon/calculate";
import { calculatePercentageDiscountCoupon } from "./PercentageDiscountCoupon/calculate";

const getCouponCombos = (coupons: Coupon[]) => {
  const result: Coupon[][] = [];

  function getPermutations(arr: Coupon[], currentPermutation: Coupon[]) {
    if (arr.length === 0) {
      result.push(currentPermutation);
      return;
    }

    for (let i = 0; i < arr.length; i += 1) {
      {
        const nextElement = arr[i];
        const remainingElements = [...arr.slice(0, i), ...arr.slice(i + 1)];
        getPermutations(remainingElements, [
          ...currentPermutation,
          nextElement,
        ]);
      }
    }
  }

  getPermutations(coupons, []);

  return result;
};

const getDiscountAmount = ({
  coupon,
  totalPrice,
  initialTotalPrice,
  cartItems,
  hasRemoteAreaShipping,
}: {
  coupon: Coupon;
  totalPrice: number;
  initialTotalPrice: number;
  cartItems: CartItem[];
  hasRemoteAreaShipping: boolean;
}) => {
  switch (coupon.discountType) {
    case CouponType.FIXED:
      return calculateFixedDiscountCoupon({ coupon });
    case CouponType.FREE_SHIPPING:
      return calculateFreeShippingCoupon({
        hasDefaultShipping: calculateShippingFee(initialTotalPrice) !== 0,
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

  const getTotalDiscountForCombo = (combo: Coupon[]) => {
    return combo.reduce(
      ({ totalPrice, totalDiscount }, coupon) => {
        const discount = getDiscountAmount({
          coupon,
          totalPrice,
          initialTotalPrice,
          cartItems,
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
