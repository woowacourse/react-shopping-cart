import { useRecoilValue } from 'recoil';

import { couponsState } from '@recoil/coupon/atom';

const useCouponFinder = () => {
  const coupons = useRecoilValue(couponsState);

  const findCouponByCode = (couponCode: string) => {
    return coupons.find(({ code }) => couponCode === code);
  };

  return { findCouponByCode };
};

export default useCouponFinder;
