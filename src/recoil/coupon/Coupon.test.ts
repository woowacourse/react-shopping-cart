import { CartItem, DiscountCondition, DiscountType } from "../../types/types";

type ValidationType = "minimumAmount" | "buyX" | "availableTime";
type ValidateCoupon = (coupon: DiscountCondition, cartItemList: CartItem[]) => boolean;
const validateCouponCondition: Partial<Record<DiscountCondition, ValidateCoupon>> = {
  minimumAmount: (coupon, cartItemList) => {
    if (!("minimumAmount" in coupon)) return true;
    coupon;
    return true;
  },
};

const discountCoupon = {};
