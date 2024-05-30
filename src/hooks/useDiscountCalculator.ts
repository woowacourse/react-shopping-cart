import { useRecoilValue } from 'recoil';
import { couponsState } from '../recoil/atoms';
import { orderAmountState, shippingCostState, checkedCartItemsState } from '../recoil/selectors';

import { Coupon } from '../type';
import { useCouponValidityChecker } from './';
import { calculateDiscountAmountByCoupon, getPermutations } from '../utils';

export default function useDiscountCalculator() {
  const coupons = useRecoilValue(couponsState);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const orderAmount = useRecoilValue(orderAmountState);
  const shippingCost = useRecoilValue(shippingCostState);
  const { isCouponValid } = useCouponValidityChecker();

  const getDiscountAmountByCoupon = (coupon: Coupon, currentTotalAmount: number) => {
    if (!isCouponValid(coupon)) {
      return 0;
    }

    return calculateDiscountAmountByCoupon({
      coupon,
      cartItems: checkedCartItems,
      shippingCost,
      currentTotalAmount,
    });
  };

  const getDiscountAmount = (couponIds: number[]) => {
    if (couponIds.length === 0) return 0;

    const couponIdsPermutations = getPermutations(couponIds);
    return Math.max(
      ...couponIdsPermutations.map((couponIds) => getDiscountAmountForPermutation(couponIds)),
    );
  };

  const getDiscountAmountForPermutation = (couponIds: number[]) => {
    return couponIds.reduce((discountAmount, couponId) => {
      const coupon = coupons.find((currentCoupon) => currentCoupon.id === couponId);

      if (!coupon) return discountAmount;

      const currentTotalAmount = orderAmount - discountAmount;
      return discountAmount + getDiscountAmountByCoupon(coupon, currentTotalAmount);
    }, 0);
  };

  return {
    getDiscountAmount,
    getDiscountAmountByCoupon,
  };
}
