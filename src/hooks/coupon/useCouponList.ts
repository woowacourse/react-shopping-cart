import { useRecoilValue } from 'recoil';
import { couponListState } from '../../recoil/coupon/atom';

const useCouponList = () => {
  const couponList = useRecoilValue(couponListState);

  return { couponList };
};

export default useCouponList;
