import { useRecoilValue } from 'recoil';
import { couponList } from '../../recoil/atoms/atoms';
import { useCartCalculator } from '../useCartCalculator/useCartCalculator';

export const useCoupons = () => {
  const coupons = useRecoilValue(couponList);
  const { getTotalPriceAfterDiscount } = useCartCalculator();

  return {
    coupons,
    getTotalPriceAfterDiscount,
  };
};
