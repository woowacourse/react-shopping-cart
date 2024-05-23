import { cartItemsState } from "../../recoil/cartItems";
import { useRecoilValue } from "recoil";
import { cartAmountState } from "../../recoil/cartAmount";
import { RawCoupon } from "../../types/rawCoupon";
import { isCouponSelectable } from "./isCouponSelectable";

type CouponSelectabilityChecker = (coupon: RawCoupon) => boolean;

export const useCouponSelectabilityChecker = (): CouponSelectabilityChecker => {
  const cartItems = useRecoilValue(cartItemsState);
  const { orderAmount, shippingCost } = useRecoilValue(cartAmountState);

  return (coupon: RawCoupon) => {
    return isCouponSelectable(coupon, cartItems, { orderAmount, shippingCost });
  };
};
