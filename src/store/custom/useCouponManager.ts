import * as CouponManager from '../couponStates';
import { useManager } from './useManager';

const selectors = {
  allCoupons: CouponManager.allCouponStates,
  isMaxLengthCheckedCouponLength: CouponManager.isMaxLengthCheckedCouponLengthSelector,
  totalMaxDiscountPrice: CouponManager.totalMaxDiscountPriceSelector,
};

const actions = {
  initializeCouponStates: CouponManager.initializeCouponStatesSelector,
};

const states = {
  allCoupons: CouponManager.allCouponStates,
  isCheckedIndividualCoupon: (id: number) => CouponManager.isCheckedIndividualCouponSelector(id),
};

export const useCouponManager = () => useManager(selectors, actions, states);
