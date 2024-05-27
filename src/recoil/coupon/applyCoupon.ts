import { GetRecoilValue } from "recoil";
import { BuyXGetYDiscount, Coupon, FixedDiscount, PercentageDiscount, freeShippingDiscount } from "src/types/Coupon";
import { orderPriceSelector } from "../cart/orderSummaryState";
import { cartItemListAtom } from "../cart/cartItemState";

type discountFunc = (coupon: Coupon, get: GetRecoilValue) => number;
export const discountCouponOptions: Record<Coupon["discountType"], discountFunc> = {
  fixed: (coupon: Coupon & FixedDiscount, get) => coupon.discount,
  percentage: (coupon: Coupon & PercentageDiscount, get) => coupon.discount * 0.01 * get(orderPriceSelector),
  freeShipping: (coupon: Coupon & freeShippingDiscount, get) => 3000,
  buyXgetY: (coupon: Coupon & BuyXGetYDiscount, get) => {
    const cartItemList = get(cartItemListAtom);
    const discounts = cartItemList.map(
      (item) =>
        Number(item.quantity / (coupon.getQuantity + coupon.buyQuantity)) * coupon.getQuantity * item.product.price
    );
    return Math.max(...discounts);
  },
};

export const getDiscountForCoupon = (coupon, get) => {
  return discountCouponOptions[coupon.discountType](coupon, get);
};
