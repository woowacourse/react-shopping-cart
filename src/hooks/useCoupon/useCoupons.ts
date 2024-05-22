import { useRecoilValue } from 'recoil';

import { couponsState } from '@recoil/coupon/atom';

export const useCoupons = () => {
  const coupons = useRecoilValue(couponsState);

  return { coupons };
};
