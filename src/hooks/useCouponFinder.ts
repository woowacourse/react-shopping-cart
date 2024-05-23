import { useRecoilValue } from 'recoil';

import { fetchCouponSelector } from '@recoil/coupons/fetchCouponSelector';

export const useCouponFinder = () => {
  const coupons = useRecoilValue(fetchCouponSelector);

  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
