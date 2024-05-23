import { useRecoilState, useRecoilValue } from 'recoil';
import { couponListQuery, couponListState } from './couponListAtom';

const useFetchCouponList = () => {
  const [CouponList, setCouponList] = useRecoilState(couponListState);
  const newCouponList = useRecoilValue(couponListQuery);

  const fetchCouponList = () => {
    if (CouponList.length === 0) {
      setCouponList(newCouponList);
    }
  };

  return { fetchCouponList };
};

export default useFetchCouponList;
