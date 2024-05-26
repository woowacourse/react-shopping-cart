import { cartItemsState } from "../../recoil/cartItems";
import { useRecoilValue } from "recoil";
import { cartAmountState } from "../../recoil/cartAmount";
import { RawCoupon } from "../../types/rawCoupon";
import { isCouponSelectable } from "./isCouponSelectable";

interface UseCouponSelectabilityCheckerReturn {
  checkCouponSelectable: (coupon: RawCoupon) => boolean;
}

export const useCouponSelectabilityChecker = (): UseCouponSelectabilityCheckerReturn => {
  const cartItems = useRecoilValue(cartItemsState);
  const { orderAmount, shippingCost } = useRecoilValue(cartAmountState);

  const checkCouponSelectable = (coupon: RawCoupon) => {
    return isCouponSelectable(coupon, cartItems, { orderAmount, shippingCost });
  };

  return {
    checkCouponSelectable,
  };
};
