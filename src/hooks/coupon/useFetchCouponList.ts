import { useRecoilState, useRecoilValue } from 'recoil';

import { couponListState } from '../../recoil/coupon/atom';
import { couponListQuery } from '../../recoil/coupon/selector';
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
