import { useRecoilValue } from 'recoil';
import { couponsState } from '../recoil/atoms';

export const useCouponFinder = () => {
  const coupons = useRecoilValue(couponsState);
  /**
   * code로 쿠폰 찾기
   * @returns 일치하는 쿠폰  | 없으면 undefined 반환
   */
  const findCouponByCode = (code: string) => {
    return coupons.find((coupon) => coupon.code === code);
  };

  return {
    findCouponByCode,
  };
};
