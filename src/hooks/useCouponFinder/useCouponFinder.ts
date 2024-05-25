import { useRecoilValue } from 'recoil';
import { couponItemsState } from '../../recoil/atoms/atoms';

export const useCouponFinder = () => {
  const couponItems = useRecoilValue(couponItemsState);

  const findCouponByCode = (code: string) => {
    return couponItems.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
