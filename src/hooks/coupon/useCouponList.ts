import { useRecoilState } from 'recoil';

import useApiErrorState from '../error/useApiErrorState';
import { requestCouponList } from '../../apis/couponList';
import { couponListState } from '../../recoil/coupon/atom';
import { FailedFetchCouponListError } from '../../error/customError';

const useCouponList = () => {
  const [couponList, setCouponList] = useRecoilState(couponListState);
  const { setApiError, resetApiError } = useApiErrorState();

  const fetchCouponList = async () => {
    if (couponList.length !== 0) return;
    try {
      const result = await requestCouponList();
      setCouponList(result);

      resetApiError();
    } catch (error) {
      setApiError(new FailedFetchCouponListError());
    }
  };

  return { couponList, fetchCouponList };
};

export default useCouponList;
