import { useRecoilValue } from 'recoil';

import { selectedCouponListState } from '../../recoil/coupon/atom';

const useSelectedCouponList = () => {
  const selectedCouponList = useRecoilValue(selectedCouponListState);

  const selectedCouponAmount = selectedCouponList.length;

  return {
    selectedCouponList,
    selectedCouponAmount,
  };
};

export default useSelectedCouponList;
