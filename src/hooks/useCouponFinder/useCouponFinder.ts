import { useRecoilValue } from 'recoil';
import { couponList } from '../../recoil/atoms/atoms';

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponList);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
