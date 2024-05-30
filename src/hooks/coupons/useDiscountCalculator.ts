import { useRecoilValue } from "recoil";
import { useCouponApplicabilityChecker } from ".";
import { CartItemType, Coupon } from "../../types";
import {
  selectedCartItems,
  shippingFeeSelector,
} from "./../../recoil/selectors";

const useDiscountCalculator = () => {
  const { isCouponApplicable } = useCouponApplicabilityChecker();
  const selectedCartItem = useRecoilValue(selectedCartItems);
  const shippingFFeee = useRecoilValue(shippingFeeSelector);

  const calculateFixedDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, totalAmount })) {
      return 0;
    }
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, totalAmount: number) => {
    if (!isCouponApplicable({ coupon, totalAmount })) {
      return 0;
    }
    return Math.floor((totalAmount * (coupon.discount ?? 0)) / 100);
  };

  const calculateBuyXgetY = () => {
    return Math.max(
      ...selectedCartItem.map((orderItem) => orderItem.product.price)
    );
  };

  const calculateDiscountAmount = ({
    coupon,
    totalAmount,
    now = new Date(),
  }: {
    coupon: Coupon;
    totalAmount: number;
    cartItems: CartItemType[];
    now?: Date;
  }) => {
    if (!isCouponApplicable({ coupon, totalAmount, now })) {
      return 0;
    }

    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon, totalAmount);
      case "percentage":
        return calculatePercentageDiscount(coupon, totalAmount);
      case "freeShipping":
        return shippingFFeee;
      case "buyXgetY":
        return calculateBuyXgetY();
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};

export default useDiscountCalculator;
