import { useRecoilValue } from 'recoil';
import { couponListState } from '../../recoil/atoms/atoms';
import { useCartCalculator } from '../useCartCalculator/useCartCalculator';

export const useCoupons = () => {
  const coupons = useRecoilValue(couponListState);
  const { calculateTotalWithCoupon } = useCartCalculator();

  return {
    coupons,
    calculateTotalWithCoupon,
  };
};
