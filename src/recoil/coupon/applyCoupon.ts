import { GetRecoilValue } from "recoil";
import { BuyXGetYDiscount, Coupon, FixedDiscount, PercentageDiscount, freeShippingDiscount } from "src/types/Coupon";
import { orderPriceSelector, shippingFeeSelector } from "../cart/orderSummaryState";
import { cartItemListAtom } from "../cart/cartItemState";
import { isCheckedSelectorFamily } from "../cart/checkedState";

type discountFunc = (coupon: Coupon, get: GetRecoilValue) => number;
export const discountCouponOptions: Record<Coupon["discountType"], discountFunc> = {
  fixed: (coupon: Coupon & FixedDiscount, get) => coupon.discount,
  percentage: (coupon: Coupon & PercentageDiscount, get) => coupon.discount * 0.01 * get(orderPriceSelector),
  freeShipping: (coupon: Coupon & freeShippingDiscount, get) => get(shippingFeeSelector),
  buyXgetY: (coupon: Coupon & BuyXGetYDiscount, get) => {
    const cartItemValidList = get(cartItemListAtom).filter(
      (item) => item.quantity >= 3 && isCheckedSelectorFamily(item.id)
    );

    const discounts = cartItemValidList.map(
      (item) =>
        Number(item.quantity / (coupon.getQuantity + coupon.buyQuantity)) * coupon.getQuantity * item.product.price
    );
    return Math.max(...discounts);
  },
};

export const getDiscountForCoupon = (coupon: Coupon, get: GetRecoilValue) => {
  return discountCouponOptions[coupon.discountType](coupon, get);
};
