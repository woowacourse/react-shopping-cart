import { useRecoilValue } from 'recoil';
import { couponListState } from '../../recoil/atoms/atoms';

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponListState);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
