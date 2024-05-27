import { cartItemsState } from "../../recoil/cartItems";
import { useRecoilValue } from "recoil";
import { cartAmountState } from "../../recoil/cartAmount";
import { CouponResponse } from "../../types/couponResponses";
import { isCouponSelectable } from "./isCouponSelectable";

interface UseCouponSelectabilityCheckerReturn {
  checkCouponSelectable: (coupon: CouponResponse) => boolean;
}

export const useCouponSelectabilityChecker = (): UseCouponSelectabilityCheckerReturn => {
  const cartItems = useRecoilValue(cartItemsState);
  const { orderAmount, shippingCost } = useRecoilValue(cartAmountState);

  const checkCouponSelectable = (coupon: CouponResponse) => {
    return isCouponSelectable(coupon, cartItems, { orderAmount, shippingCost });
  };

  return {
    checkCouponSelectable,
  };
};
