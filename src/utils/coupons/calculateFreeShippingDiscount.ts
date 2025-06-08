import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../../constants";
import { FreeShippingCoupon } from "../../types/type";
import { isValidExpiration } from "./isValidExpiration";

export const calculateFreeShippingDiscount = (
  price: number,
  coupon: FreeShippingCoupon,
  isRemoteArea: boolean
) => {
  if (!isValidExpiration(coupon.expirationDate)) return 0;
  if (coupon.minimumAmount > price || price > FREE_SHIPPING_MIN_AMOUNT)
    return 0;
  return SHIPPING_FEE + (isRemoteArea ? 3000 : 0);
};
