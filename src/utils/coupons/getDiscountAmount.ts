import { Coupon } from "../../types/response";
import getBuyXGetYDiscount from "./getBuyXGetYDiscount";
import { isFreeShippingAvailable } from "./isCouponAvailable";
import { CartItemCheckType } from "../../hooks/useCartAPI";

const getDiscountAmount = (
  coupon: Coupon,
  currentPrice: number,
  cartItemsCheckData: CartItemCheckType[],
  shippingFee: number
): number => {
  switch (coupon.discountType) {
    case "fixed":
      return coupon.discount || 0;
    case "percentage":
      return (currentPrice * (coupon.discount || 0)) / 100;
    case "buyXgetY":
      return getBuyXGetYDiscount(coupon, cartItemsCheckData);
    case "freeShipping":
      return isFreeShippingAvailable(coupon, currentPrice) ? shippingFee : 0;
    default:
      return 0;
  }
};

export default getDiscountAmount;
