import * as CouponManager from '../couponStates';
import { useManager } from './useManager';

const selectors = {
  allCoupons: CouponManager.allCouponStates,
  isMaxLengthCheckedCouponLength: CouponManager.isMaxLengthCheckedCouponLengthSelector,
  totalMaxDiscountPrice: CouponManager.totalMaxDiscountPriceSelector,
  isCheckedIndividualCoupon: (id: number) => CouponManager.isCheckedIndividualCouponSelector(id),
};

const actions = {
  setCheckedIndividualCoupon: (id: number) => CouponManager.isCheckedIndividualCouponSelector(id),
  initializeCouponStates: CouponManager.initializeCouponStatesSelector,
};

const states = {
  allCoupons: CouponManager.allCouponStates,
};

export const useCouponManager = () => useManager(selectors, actions, states);
