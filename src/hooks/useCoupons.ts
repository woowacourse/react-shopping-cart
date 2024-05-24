import { useRecoilValue } from 'recoil';

import { CouponAvailabilityType } from '../type';
import { couponsState, checkedCouponIdsState } from '../recoil/atoms';
import { orderAmountState } from '../recoil/selectors';

import useDiscountCalculator from './useDiscountCalculator';
import useCouponValidityChecker from './useCouponValidityChecker';
import getPermutations from '../utils/getPermutations';

export default function useCoupons() {
  const coupons = useRecoilValue(couponsState);
  const orderAmount = useRecoilValue(orderAmountState);
  const checkedCouponIds = useRecoilValue(checkedCouponIdsState);

  const { isCouponValid } = useCouponValidityChecker();
  const { getDiscountAmountByCoupon } = useDiscountCalculator();

  const getCouponsAvailability = () => {
    return coupons.reduce((couponValidity: CouponAvailabilityType, coupon) => {
      couponValidity[coupon.id] = isCouponValid(coupon);
      return couponValidity;
    }, {});
  };

  const isFreeShippingAvailable = () => {
    const freeShippingCoupon = coupons.find((coupon) => coupon.discountType === 'freeShipping');
    return freeShippingCoupon && isCouponValid(freeShippingCoupon);
  };

  const getDiscountAmount = () => {
    const couponIdsPermutations = getPermutations(checkedCouponIds);
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
    });
  };

  return {
    coupons,
    getCouponsAvailability,
    getDiscountAmount,
    isFreeShippingAvailable,
  };
}
