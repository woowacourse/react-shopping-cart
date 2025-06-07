import { CouponContent } from '@/api/type';
import { getAllCouponCombinationIds } from '../utils/getAllCouponCombinationIds';

export const useCouponCombinations = (availableCoupons: CouponContent[]) => {
  const allCouponCombinationIds = getAllCouponCombinationIds(availableCoupons);
  return { allCouponCombinationIds };
};
