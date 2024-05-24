import { useRecoilValue } from "recoil";
import { Coupon } from "../../types/coupon";
import { checkedCartItemsSelector, shippingFeeSelector } from "../../recoil/selector/selector";

export const useDiscountCalculator = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);
  const shippingFee = useRecoilValue(shippingFeeSelector);

  const calculateFixedDiscount = (coupon: Coupon) => {
    return coupon.discount ?? 0;
  };

  const calculatePercentageDiscount = (coupon: Coupon, currentPrice: number) => {
    return Math.floor((currentPrice * (coupon.discount ?? 0)) / 100);
  };

  const calculateBuyXgetYDiscount = (coupon: Coupon) => {
    return Math.max(...checkedCartItems.map((item) => item.product.price)) * coupon.getQuantity;
  };

  const calculateFreeShippingDiscount = () => {
    return shippingFee;
  };

  const calculateDiscountAmount = (coupon: Coupon, currentPrice: number) => {
    switch (coupon.discountType) {
      case "fixed":
        return calculateFixedDiscount(coupon);
      case "percentage":
        return calculatePercentageDiscount(coupon, currentPrice);
      case "buyXgetY":
        return calculateBuyXgetYDiscount(coupon);
      case "freeShipping":
        return calculateFreeShippingDiscount();
      default:
        return 0;
    }
  };

  return {
    calculateDiscountAmount,
  };
};
