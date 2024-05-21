import { useSetRecoilState } from 'recoil';
import { requestCouponList } from '../../apis/requests/couponList';
import { couponListStateQuery } from './couponListState';

const useCouponList = () => {
  const setCouponList = useSetRecoilState(couponListStateQuery);

  const updateCouponList = async () => {
    const couponList = await requestCouponList();

    setCouponList(couponList);
  };

  return { updateCouponList };
};

export default useCouponList;
