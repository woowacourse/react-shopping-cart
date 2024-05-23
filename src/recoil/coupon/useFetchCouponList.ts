import { useRecoilState, useRecoilValue } from 'recoil';
import { couponListQuery, couponListState } from './couponListAtom';
import { validateCouponExpiration } from '../../utils/validateCouponExpiration';

const useFetchCouponList = () => {
  const [CouponList, setCouponList] = useRecoilState(couponListState);
  const newCouponList = useRecoilValue(couponListQuery);

  const fetchCouponList = () => {
    if (CouponList.length === 0) {
      setCouponList(
        newCouponList.filter((coupon) => validateCouponExpiration(coupon)),
      );
    }
  };

  return { fetchCouponList };
};

export default useFetchCouponList;
