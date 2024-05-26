import { useRecoilValue } from 'recoil';
import { couponListSelector } from '../../recoil';

export default function useCoupon() {
  const coupons = useRecoilValue(couponListSelector);

  return { coupons, discountAmount: 0 };
}
