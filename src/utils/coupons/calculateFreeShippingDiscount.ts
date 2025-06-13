import { FREE_SHIPPING_MIN_AMOUNT, SHIPPING_FEE } from "../../constants";
import { FreeShippingCoupon } from "../../types/type";
import { isValidExpiration } from "./isValidExpiration";

export const calculateFreeShippingDiscount = (
  price: number,
  coupon: FreeShippingCoupon,
  isRemoteArea: boolean
) => {
  const remoteAreaShippingFee = isRemoteArea ? SHIPPING_FEE : 0;
  if (!isValidExpiration(coupon.expirationDate)) return 0;
  if (coupon.minimumAmount > price) return 0;
  if (price >= FREE_SHIPPING_MIN_AMOUNT) return remoteAreaShippingFee;
  return SHIPPING_FEE + remoteAreaShippingFee;
};
